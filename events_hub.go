package web

import (
	"fmt"
)

type idEventFunc struct {
	id string
	ef EventHandler
}

type EventsHub struct {
	eventFuncs []*idEventFunc
	wraper     func(ef EventHandler) EventHandler
}

func (p *EventsHub) Wraper(f func(ef EventHandler) EventHandler) {
	p.wraper = f
}

func (p *EventsHub) String() string {
	var rs []string
	for _, ne := range p.eventFuncs {
		rs = append(rs, ne.id)
	}
	return fmt.Sprintf("%#+v", rs)
}

func (p *EventsHub) RegisterEventHandler(eventFuncId string, ef EventHandler) (key string) {
	key = eventFuncId
	if p.eventHandleById(eventFuncId) != nil {
		return
	}

	if p.wraper != nil {
		ef = p.wraper(ef)
	}

	p.eventFuncs = append(p.eventFuncs, &idEventFunc{eventFuncId, ef})
	return
}

func (p *EventsHub) RegisterEventFunc(eventFuncId string, ef EventFunc) (key string) {
	return p.RegisterEventHandler(eventFuncId, ef)
}

func (p *EventsHub) addMultipleEventFuncs(vs ...interface{}) (key string) {
	if len(vs)%2 != 0 {
		panic("id and func not paired")
	}
	for i := 0; i < len(vs); i = i + 2 {
		p.RegisterEventHandler(vs[i].(string), EventFunc(vs[i+1].(func(ctx *EventContext) (r EventResponse, err error))))
	}
	return
}

func (p *EventsHub) eventHandleById(id string) (r EventHandler) {
	for _, ne := range p.eventFuncs {
		if ne.id == id {
			r = ne.ef
			return
		}
	}
	return
}

func (p *EventsHub) Merge(hub *EventsHub) {
	p.eventFuncs = append(p.eventFuncs, hub.eventFuncs...)
}
