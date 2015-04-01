package com.lardi_trans.http.service.utils;

import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Andrey on 01.04.2015.
 */
public class DefaultResponse {
    private static Map<String, String> JUST_OK;
    private static Map<String, String> JUST_ERROR;

    static {
        JUST_OK = new HashMap<>();
        JUST_OK.put("status", "ok");

        JUST_ERROR = new HashMap<>();
        JUST_ERROR.put("status", "error");
    }

    public static Response ok() {
        return Response.ok().entity(JUST_OK).build();
    }

    public static Response ok(Object result) {
        HashMap<String, Object> res = new HashMap<>();
        res.put("status", "error");
        res.put("result", result);

        return Response.ok().entity(res).build();
    }

    public static Response error() {
        return Response.status(Response.Status.BAD_REQUEST).entity(JUST_ERROR).build();
    }

    public static Response error(String msg) {
        HashMap<String, Object> res = new HashMap<>();
        res.put("status", "error");
        res.put("message", msg);

        return Response.status(Response.Status.BAD_REQUEST).entity(res).build();
    }

    public static Response error(String msg, Object data) {
        HashMap<String, Object> res = new HashMap<>();
        res.put("status", "error");
        res.put("message", msg);
        res.put("data", data);

        return Response.status(Response.Status.BAD_REQUEST).entity(res).build();
    }
}
