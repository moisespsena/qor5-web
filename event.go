package web

import "net/http"

const ExecuteEventPatam = "__execute_event__"

func CurrentExecuteEvent(r *http.Request) string {
	return r.Form.Get(ExecuteEventPatam)
}
