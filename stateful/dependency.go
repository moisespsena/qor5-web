package stateful

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/pkg/errors"
	. "github.com/theplant/htmlgo"
	"github.com/theplant/inject"
)

var ErrInjectorNotFound = errors.New("injector not found")

var defaultDependencyCenter = NewDependencyCenter()

// just to make it easier to get the name of the currently applied injector
type InjectorName string

type DependencyCenter struct {
	mu        sync.RWMutex
	injectors map[string]*inject.Injector
}

func NewDependencyCenter() *DependencyCenter {
	return &DependencyCenter{
		injectors: map[string]*inject.Injector{},
	}
}

type registerInjectorOptions struct {
	parent string
}

type RegisterInjectorOption func(*registerInjectorOptions)

func WithParent(parent string) RegisterInjectorOption {
	return func(o *registerInjectorOptions) {
		o.parent = parent
	}
}

func (r *DependencyCenter) RegisterInjector(name string, opts ...RegisterInjectorOption) {
	o := new(registerInjectorOptions)
	for _, opt := range opts {
		opt(o)
	}

	name = strings.TrimSpace(name)
	parent := strings.TrimSpace(o.parent)
	if name == "" {
		panic(fmt.Errorf("name is required"))
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.injectors[name]; ok {
		panic(fmt.Errorf("injector %q already exists", name))
	}

	var parentInjector *inject.Injector
	if parent != "" {
		var ok bool
		parentInjector, ok = r.injectors[parent]
		if !ok {
			panic(fmt.Errorf("parent injector %q not found", parent))
		}
	}

	inj := inject.New()
	inj.Provide(func() InjectorName { return InjectorName(name) })
	if parentInjector != nil {
		inj.SetParent(parentInjector)
	}
	r.injectors[name] = inj
}

func (r *DependencyCenter) Injector(name string) (*inject.Injector, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	inj, ok := r.injectors[name]
	if !ok {
		return nil, errors.Wrap(ErrInjectorNotFound, name)
	}
	return inj, nil
}

func RegisterInjector(name string, opts ...RegisterInjectorOption) {
	defaultDependencyCenter.RegisterInjector(name, opts...)
}

func Injector(name string) (*inject.Injector, error) {
	return defaultDependencyCenter.Injector(name)
}

func MustInjector(name string) *inject.Injector {
	inj, err := Injector(name)
	if err != nil {
		panic(err)
	}
	return inj
}

type injectorNameCtxKey struct{}

func WithInjectorName(ctx context.Context, name string) context.Context {
	return context.WithValue(ctx, injectorNameCtxKey{}, name)
}

func InjectorNameFromContext(ctx context.Context) string {
	name, _ := ctx.Value(injectorNameCtxKey{}).(string)
	return name
}

func Provide(name string, fs ...any) error {
	inj, err := defaultDependencyCenter.Injector(name)
	if err != nil {
		return err
	}
	return inj.Provide(fs...)
}

func MustProvide(name string, fs ...any) {
	err := Provide(name, fs...)
	if err != nil {
		panic(err)
	}
}

func Inject(injectorName string, c HTMLComponent) (HTMLComponent, error) {
	inj, err := defaultDependencyCenter.Injector(injectorName)
	if err != nil {
		return nil, err
	}
	if err := inj.Apply(Unwrap(c)); err != nil {
		return nil, err
	}
	return ComponentFunc(func(ctx context.Context) ([]byte, error) {
		ctx = WithInjectorName(ctx, injectorName)
		return c.MarshalHTML(ctx)
	}), nil
}

func MustInject(injectorName string, c HTMLComponent) HTMLComponent {
	c, err := Inject(injectorName, c)
	if err != nil {
		panic(err)
	}
	return c
}

func Apply(ctx context.Context, target any) error {
	name := InjectorNameFromContext(ctx)
	if name == "" {
		return nil
	}
	inj, err := defaultDependencyCenter.Injector(name)
	if err != nil {
		return err
	}
	if c, ok := target.(HTMLComponent); ok {
		return inj.Apply(Unwrap(c))
	}
	return inj.Apply(target)
}

func MustApply[T any](ctx context.Context, target T) T {
	err := Apply(ctx, target)
	if err != nil {
		panic(err)
	}
	return target
}
