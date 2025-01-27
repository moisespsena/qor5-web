package tag

import (
	"reflect"
	"unsafe"

	h "github.com/theplant/htmlgo"
)

func RemoveAttr(t *h.HTMLTagBuilder, key ...string) {
	rf := reflect.ValueOf(t).Elem().FieldByName("attrs")
	rf = reflect.NewAt(rf.Type(), unsafe.Pointer(rf.UnsafeAddr()))
	rfv := rf.Elem()
	newValues := reflect.MakeSlice(rf.Type().Elem(), 0, 0)

loop:
	for i := 0; i < rfv.Len(); i++ {
		e := rfv.Index(i).Elem()
		curKey := e.FieldByName("key").String()
		for _, key := range key {
			if curKey == key {
				continue loop
			}
		}

		newValues = reflect.Append(newValues, e.Addr())
	}

	rf.Elem().Set(newValues)
}

func GetAttr(t *h.HTMLTagBuilder, key string) *Attr {
	rf := reflect.ValueOf(t).Elem().FieldByName("attrs")
	rfv := reflect.NewAt(rf.Type(), unsafe.Pointer(rf.UnsafeAddr())).Elem()
	for i := 0; i < rfv.Len(); i++ {
		e := rfv.Index(i).Elem()
		keyf := e.FieldByName("key")
		if keyf.String() == key {
			valf := e.FieldByName("value")
			return &Attr{reflect.NewAt(valf.Type(), unsafe.Pointer(valf.UnsafeAddr()))}
		}
	}
	return nil
}

func Children(t *h.HTMLTagBuilder) *[]h.HTMLComponent {
	rf := reflect.ValueOf(t).Elem().FieldByName("children")
	rfv := reflect.NewAt(rf.Type(), unsafe.Pointer(rf.UnsafeAddr()))
	return rfv.Interface().(*[]h.HTMLComponent)
}
