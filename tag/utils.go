package tag

import h "github.com/theplant/htmlgo"

func FirstValidComponent(c h.HTMLComponent) h.HTMLComponent {
	switch t := c.(type) {
	case h.HTMLComponents:
		for _, comp := range t {
			if comp != nil {
				return FirstValidComponent(comp)
			}
		}
	case interface{ GetChildren() []h.HTMLComponent }:
		return FirstValidComponent(h.HTMLComponents(t.GetChildren()))
	case *h.HTMLTagBuilder:
		return FirstValidComponent(h.HTMLComponents((&TagBuilder[any]{tag: t}).GetChildren()))
	}
	return c
}
