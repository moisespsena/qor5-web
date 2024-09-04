package tag

import "reflect"

type Attr struct {
	v reflect.Value
}

func (t *Attr) Get() any {
	return t.v.Elem().Interface()
}

func (t *Attr) Set(v any) {
	t.v.Elem().Set(reflect.ValueOf(v))
}

func (t *Attr) Override(f func(old any) any) {
	t.Set(f(t.Get()))
}
