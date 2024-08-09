package web

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"reflect"
	"strconv"
	"strings"
	"time"
	"unsafe"

	"github.com/go-playground/form/v4"
	"github.com/sunfmin/reflectutils"
	h "github.com/theplant/htmlgo"
)

type PageResponse struct {
	PageTitle   string
	PageActions []h.HTMLComponent
	Body        h.HTMLComponent
}

type PortalUpdate struct {
	Name string          `json:"name,omitempty"`
	Body h.HTMLComponent `json:"body,omitempty"`
}

// @snippet_begin(EventResponseDefinition)
type EventResponse struct {
	PageTitle     string           `json:"pageTitle,omitempty"`
	Body          h.HTMLComponent  `json:"body,omitempty"`
	Reload        bool             `json:"reload,omitempty"`
	PushState     *LocationBuilder `json:"pushState"`             // This we don't omitempty, So that {} can be kept when use url.Values{}
	RedirectURL   string           `json:"redirectURL,omitempty"` // change window url without push state
	ReloadPortals []string         `json:"reloadPortals,omitempty"`
	UpdatePortals []*PortalUpdate  `json:"updatePortals,omitempty"`
	Data          interface{}      `json:"data,omitempty"`      // used for return collection data like TagsInput data source
	RunScript     string           `json:"runScript,omitempty"` // used with InitContextVars to set values for example vars.show to used by v-model
}

// @snippet_end

// @snippet_begin(PageFuncAndEventFuncDefinition)
type (
	PageFunc  func(ctx *EventContext) (r PageResponse, err error)
	EventFunc func(ctx *EventContext) (r EventResponse, err error)
)

// @snippet_end

type LayoutFunc func(in PageFunc) PageFunc

// @snippet_begin(EventFuncHubDefinition)
type EventFuncHub interface {
	RegisterEventFunc(eventFuncId string, ef EventFunc) (key string)
}

// @snippet_end

func AppendRunScripts(er *EventResponse, scripts ...string) {
	if er.RunScript != "" {
		scripts = append([]string{er.RunScript}, scripts...)
	}
	er.RunScript = strings.Join(scripts, "; ")
}

type EventFuncID struct {
	ID string `json:"id,omitempty"`
}

type ContextValuePointer struct {
	dot, child context.Context
	key        any
	value      reflect.Value
}

func (p *ContextValuePointer) Get() interface{} {
	return p.value.Interface()
}

func (p *ContextValuePointer) Set(value interface{}) {
	p.value.Set(reflect.ValueOf(value))
}

func (p *ContextValuePointer) With(value interface{}) func() {
	old := p.Get()
	p.Set(value)
	return func() {
		p.Set(old)
	}
}

func (p *ContextValuePointer) Parent() context.Context {
	parent := reflect.Indirect(reflect.ValueOf(p.dot).Elem()).FieldByName("Context")
	if parent.IsValid() {
		return parent.Interface().(context.Context)
	}
	return nil
}

func (p *ContextValuePointer) Top() (top *ContextValuePointer) {
	parent := p.Parent()
	top = p
	if parent == nil {
		return
	}

	p = getContextValuer(p.dot, parent, p.key)
	for p != nil && parent != nil {
		top = p
		parent = top.Parent()
		if parent != nil {
			p = getContextValuer(top.dot, parent, p.key)
		}
	}
	return
}

func (p *ContextValuePointer) Delete() context.Context {
	parent := p.Parent()
	if p.child == nil {
		return parent
	}
	parentField := reflect.Indirect(reflect.ValueOf(p.child).Elem()).FieldByName("Context")
	parentField.Set(reflect.ValueOf(parent))
	return p.child
}

var valueCtxType = reflect.TypeOf(context.WithValue(context.Background(), "a", nil)).Elem()

func getContextValuer(child, ctx context.Context, key any) *ContextValuePointer {
	contextValues := reflect.Indirect(reflect.ValueOf(ctx))
	contextKeys := reflect.TypeOf(ctx)
	for contextKeys.Kind() == reflect.Ptr {
		contextKeys = contextKeys.Elem()
	}

	if contextValues.Type() == valueCtxType {
		keyField := contextValues.FieldByName("key")
		keyValue := reflect.NewAt(keyField.Type(), unsafe.Pointer(keyField.UnsafeAddr())).Elem()
		if keyValue.Interface() == key {
			if valueField := contextValues.FieldByName("val"); valueField.IsValid() {
				value := reflect.NewAt(valueField.Type(), unsafe.Pointer(valueField.UnsafeAddr())).Elem()
				return &ContextValuePointer{
					dot:   ctx,
					child: child,
					key:   key,
					value: value,
				}
			}
		}
	}

	if contextField := contextValues.FieldByName("Context"); contextField.IsValid() {
		return getContextValuer(ctx, contextField.Interface().(context.Context), key)
	}
	return nil
}

func GetContextValuer(ctx context.Context, key any) *ContextValuePointer {
	return getContextValuer(nil, ctx, key)
}

func WithContextValue(ctx *EventContext, key any, value interface{}) (done func()) {
	if ptr := GetContextValuer(ctx.R.Context(), key); ptr != nil {
		return ptr.With(value)
	}
	ctx.WithContextValue(key, value)
	return func() {
		ctx.R = ctx.R.WithContext(GetContextValuer(ctx.R.Context(), key).Top().Delete())
	}
}

type EventContext struct {
	R        *http.Request
	W        http.ResponseWriter
	Injector *PageInjector
	Flash    interface{} // pass value from actions to index
	i        int64
}

func (e *EventContext) WithContextValue(key any, value any) (r *EventContext) {
	e.R = e.R.WithContext(context.WithValue(e.R.Context(), key, value))
	return e
}

func (e *EventContext) ContextValue(key any) any {
	return e.R.Context().Value(key)
}

func (e *EventContext) Param(key string) (r string) {
	r = e.R.PathValue(key)
	if len(r) == 0 {
		r = e.R.FormValue(key)
	}
	return
}

func (e *EventContext) ParamAsInt(key string) (r int) {
	strVal := e.Param(key)
	if len(strVal) == 0 {
		return
	}
	val, _ := strconv.ParseInt(strVal, 10, 64)
	r = int(val)
	return
}

func (e *EventContext) Queries() (r url.Values) {
	r = e.R.URL.Query()
	delete(r, EventFuncIDName)
	return
}

func (ctx *EventContext) MustUnmarshalForm(v interface{}) {
	err := ctx.UnmarshalForm(v)
	if err != nil {
		panic(err)
	}
}

func (e *EventContext) UID() string {
	return "_" + fmt.Sprint(time.Now().UnixNano())
}

type CustoFormTypeDecoder struct {
	Decoder form.DecodeCustomTypeFunc
	Types   []any
}

var FormTypeDecoders []CustoFormTypeDecoder

func (ctx *EventContext) UnmarshalForm(v interface{}) (err error) {
	mf := ctx.R.MultipartForm
	if ctx.R.MultipartForm == nil {
		return
	}

	dec := form.NewDecoder()

	for _, decoder := range FormTypeDecoders {
		dec.RegisterCustomTypeFunc(decoder.Decoder, decoder.Types...)
	}

	err = dec.Decode(v, mf.Value)
	if err != nil {
		// panic(err)
		return
	}

	if len(mf.File) > 0 {
		for k, vs := range mf.File {
			_ = reflectutils.Set(v, k, vs)
		}
	}
	return
}

type contextKey int

const eventKey contextKey = iota

func WrapEventContext(parent context.Context, ctx *EventContext) (r context.Context) {
	r = context.WithValue(parent, eventKey, ctx)
	return
}

func MustGetEventContext(c context.Context) (r *EventContext) {
	r, _ = c.Value(eventKey).(*EventContext)
	if r == nil {
		panic("EventContext required")
	}
	return
}

func Injector(c context.Context) (r *PageInjector) {
	ctx := MustGetEventContext(c)
	r = ctx.Injector
	return
}
