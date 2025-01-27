package js

import (
	"bytes"
	"encoding/json"
	"sort"
)

type Raw string

func (v Raw) MarshalJSON() ([]byte, error) {
	return []byte(v), nil
}

type Object map[string]any

func (o Object) MarshalJSON() (_ []byte, err error) {
	if len(o) == 0 {
		return []byte("{}"), nil
	}

	var (
		out   bytes.Buffer
		keys  []string
		write = func(k string) {
			kb, _ := json.Marshal(k)
			out.Write(kb)
			out.WriteRune(':')
			if vb, err := json.Marshal(o[k]); err == nil {
				out.Write(vb)
			}
		}
	)

	for k := range o {
		keys = append(keys, k)
	}

	sort.Strings(keys)

	for _, k := range keys[:len(keys)-1] {
		write(k)
		if err != nil {
			return
		}
		out.WriteByte(',')
	}

	write(keys[len(keys)-1])
	if err != nil {
		return
	}

	return out.Bytes(), nil
}
