package ui

import (
	"bytes"
	"compress/flate"
	"io"
)

type Script struct {
	bytes.Buffer
}

func (s *Script) Encode() string {
	if s.Len() == 0 {
		return ""
	}
	var buf bytes.Buffer
	w, _ := flate.NewWriter(&buf, flate.BestCompression)
	io.Copy(w, s)
	w.Close()
	return buf.String()
}

func (b *Script) Decode(s string) {
	b.Reset()
	if len(s) == 0 {
		return
	}
	r := flate.NewReader(bytes.NewBufferString(s))
	io.Copy(b, r)
	r.Close()
}

func DecodeScript(s string) (sc Script) {
	if s != "" {
		sc.Decode(s)
	}
	return
}
