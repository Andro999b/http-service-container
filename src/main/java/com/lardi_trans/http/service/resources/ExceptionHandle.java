package com.lardi_trans.http.service.resources;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * Created by Andrey on 09.03.2015.
 */
public class ExceptionHandle implements ExceptionMapper<Throwable> {
    @Override
    public Response toResponse(Throwable throwable) {
        throwable.printStackTrace();
        return Response.serverError().build();
    }
}
