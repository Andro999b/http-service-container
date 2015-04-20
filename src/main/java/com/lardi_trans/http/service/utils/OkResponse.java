package com.lardi_trans.http.service.utils;

import javax.ws.rs.core.Response;

/**
 * Created by andro on 20.04.15.
 */
public class OkResponse {
    private String msg = "success response";

    public OkResponse() {}

    public OkResponse(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public static Response build(){
        return Response.ok().entity(new OkResponse()).build();
    }

    public static Response build(String msg){
        return Response.ok().entity(new OkResponse(msg)).build();
    }
}
