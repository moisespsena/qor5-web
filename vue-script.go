package web

import (
	"bytes"
	"context"
	"strings"
)

type VSetup []string

func (s VSetup) MarshalHTML(context.Context) ([]byte, error) {
	return []byte("<setup-script>\n" + strings.Join(s, "\n\n") + "\n</setup-script>\n"), nil
}

func (s *VSetup) Append(v ...string) {
	*s = append(*s, v...)
}

func VSetupScript(s ...string) VSetup {
	return s
}

type VObjectBuilder struct {
	name       string
	Properties map[string]string
	wrapValue  func(s string) string
	pre, post  string
}

func VObject(tagName string, d ...map[string]string) *VObjectBuilder {
	b := &VObjectBuilder{name: tagName}
	for _, b.Properties = range d {
	}
	return b
}

func (b *VObjectBuilder) Pre(s string) *VObjectBuilder {
	b.pre = s
	return b
}

func (b *VObjectBuilder) Post(s string) *VObjectBuilder {
	b.post = s
	return b
}

func (b *VObjectBuilder) WrapValue(f func(s string) string) *VObjectBuilder {
	b.wrapValue = f
	return b
}

func (b *VObjectBuilder) Set(key, value string) *VObjectBuilder {
	if b.Properties == nil {
		b.Properties = make(map[string]string)
	}
	b.Properties[key] = value
	return b
}

func (b *VObjectBuilder) MarshalHTML(ctx context.Context) ([]byte, error) {
	if len(b.Properties) == 0 {
		return nil, nil
	}

	var (
		out     bytes.Buffer
		tagName = "script"
		pre     = b.pre
		post    = b.post
		wv      = b.wrapValue
	)

	if v := b.Properties[":pre:"]; v != "" {
		delete(b.Properties, ":pre:")
		if pre != "" {
			pre += "\n"
		}
		pre += v
	}

	if v := b.Properties[":post:"]; v != "" {
		delete(b.Properties, ":post:")
		if post != "" {
			post += "\n"
		}
		post += v
	}

	if wv == nil {
		wv = func(s string) string { return s }
	}

	out.WriteByte('<')
	out.WriteString(tagName)
	out.WriteString(` component-mode="` + b.name + `"`)
	out.WriteByte('>')
	out.WriteByte('\n')

	if pre != "" {
		out.WriteString(pre)
		out.WriteByte('\n')
		out.WriteByte('\n')
	}

	for k, v := range b.Properties {
		out.WriteString("this.")
		out.WriteString(k)
		out.WriteByte('=')
		out.WriteString(wv(v))
		out.WriteByte(';')
		out.WriteByte('\n')
	}

	if post != "" {
		out.WriteByte('\n')
		out.WriteString(post)
		out.WriteByte('\n')
	}

	out.WriteByte('<')
	out.WriteByte('/')
	out.WriteString(tagName)
	out.WriteByte('>')
	out.WriteByte('\n')
	return out.Bytes(), nil
}

type VMethods map[string]string

func (m VMethods) MarshalHTML(c context.Context) ([]byte, error) {
	return VObject("methods", m).MarshalHTML(c)
}

type VData map[string]string

func (m VData) Pre(s string) VData {
	m[":pre:"] = s
	return m
}

func (m VData) Post(s string) VData {
	m[":post:"] = s
	return m
}

func (m VData) MarshalHTML(c context.Context) ([]byte, error) {
	return VObject("data", m).MarshalHTML(c)
}

type VComputed map[string]string

func (m VComputed) MarshalHTML(c context.Context) ([]byte, error) {
	return VObject("computed", m).WrapValue(func(s string) string {
		return "computed(" + s + ")"
	}).MarshalHTML(c)
}
