package web

import (
	"context"
	"fmt"
	"sort"
	"strings"

	. "github.com/qor5/web/v3/tag"
	"github.com/rs/xid"
	h "github.com/theplant/htmlgo"
)

type ScopeBuilder struct {
	TagBuilder[*ScopeBuilder]
	observers []Observer
	slots     map[string]any
	initVal   map[string]any
}

func Scope(children ...h.HTMLComponent) *ScopeBuilder {
	return NewTag(&ScopeBuilder{}, "go-plaid-scope", children...)
}

func (b *ScopeBuilder) VSlot(v string) *ScopeBuilder {
	return b.AppendSlot(v)
}

func (b *ScopeBuilder) Locals() *ScopeBuilder {
	return b.AppendSlot("locals")
}

func (b *ScopeBuilder) Form() *ScopeBuilder {
	return b.AppendSlot("form")
}

func (b *ScopeBuilder) Vars() *ScopeBuilder {
	return b.AppendSlot("vars")
}

func (b *ScopeBuilder) Closes() *ScopeBuilder {
	return b.AppendSlot("closer")
}

func (b *ScopeBuilder) AppendVSlot(v string) *ScopeBuilder {
	return b.Attr("v-slot", v)
}

func (b *ScopeBuilder) init(attr string, vs ...interface{}) (r *ScopeBuilder) {
	if len(vs) == 0 {
		return
	}
	js := make([]string, 0)
	for _, v := range vs {
		switch vt := v.(type) {
		case string:
			js = append(js, vt)
		default:
			js = append(js, h.JSONString(v))
		}
	}
	initVal := js[0]
	if len(js) > 1 {
		initVal = "[" + strings.Join(js, ", ") + "]"
	}
	return b.Attr(attr, initVal)
}

func (b *ScopeBuilder) Init(vs ...interface{}) (r *ScopeBuilder) {
	return b.init(":init", vs...)
}

func (b *ScopeBuilder) FormInit(vs ...interface{}) (r *ScopeBuilder) {
	return b.init(":form-init", vs...)
}

func (b *ScopeBuilder) Setup(callback string) (r *ScopeBuilder) {
	return b.init(":setup", []any{callback})
}

func (b *ScopeBuilder) Closer(vs ...interface{}) (r *ScopeBuilder) {
	if len(vs) == 0 {
		vs = append(vs, "{}")
	}
	return b.init(":closer", vs...)
}

func (b *ScopeBuilder) OnChange(v string) (r *ScopeBuilder) {
	return b.Attr("@change-debounced", fmt.Sprintf(`({locals, form, oldLocals, oldForm}) => { %s }`, v)).
		Attr(":use-debounce", 800)
}

func (b *ScopeBuilder) UseDebounce(v int) (r *ScopeBuilder) {
	return b.Attr(":use-debounce", v)
}

func (b *ScopeBuilder) AppendInit(v string) (r *ScopeBuilder) {
	t := b.GetAttr(":init")
	if t == nil {
		return b.Init(v)
	}
	t.Override(func(old any) any {
		s := old.(string)
		s = strings.TrimSpace(s[1 : len(s)-1])
		if s != "" {
			s += ", "
		}
		return "{" + s + v + "}"
	})
	return b
}

func (b *ScopeBuilder) AppendSlot(v ...string) (r *ScopeBuilder) {
	if b.slots == nil {
		b.slots = make(map[string]any)
	}
	for _, v := range v {
		if v[0] == '{' {
			v = v[1 : len(v)-1]
		}
		for _, v := range strings.Split(v, ",") {
			v = strings.TrimSpace(v)
			b.slots[v] = nil
		}
	}
	return b
}

func (b *ScopeBuilder) MarshalHTML(ctx context.Context) (r []byte, err error) {
	if len(b.observers) > 0 {
		b.Attr(":observers", h.JSONString(b.observers))
	}
	if len(b.slots) > 0 {
		var slots []string
		for k := range b.slots {
			slots = append(slots, k)
		}
		sort.Strings(slots)
		b.Attr("v-slot", "{ "+strings.Join(slots, ", ")+" }")
	}
	return b.TagBuilder.MarshalHTML(ctx)
}

type Observer struct {
	Name   string `json:"name"`
	Script string `json:"script"` // available parameters: name payload vars locals form plaid
}

func (b *ScopeBuilder) Observer(name string, script string) (r *ScopeBuilder) {
	b.observers = append(b.observers, Observer{name, script})
	return b
}

func (b *ScopeBuilder) Observers(vs ...Observer) (r *ScopeBuilder) {
	b.observers = append(b.observers, vs...)
	return b
}

func CloserScope(comp h.HTMLComponent, show ...bool) (r *ScopeBuilder) {
	r = Scope(
		comp,
	).VSlot("{closer}").
		Closer()

	for _, s := range show {
		if s {
			r.Setup("setTimeout(() => {closer.show = true},100)")
		}
	}

	return
}

type notification struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Payload any    `json:"payload"`
}

func NotifyScript(name string, payload any) string {
	return fmt.Sprintf(`vars.__notification = %s`, h.JSONString(notification{
		ID:      xid.New().String(),
		Name:    name,
		Payload: payload,
	}))
}
