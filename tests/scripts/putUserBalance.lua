wrk.method = "PUT"
wrk.body   = '{"delta": -2}'
wrk.headers["Content-Type"] = "application/json"

function request()
    return wrk.format(nil, "/user-balance/39b7468a-604a-4637-b959-548ba5de3bb1")
end