package com.lardi_trans.http.service.error;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * Created by Andrey on 09.03.2015.
 */
public class ExceptionHandler implements ExceptionMapper<Throwable> {
    @Override
    public Response toResponse(Throwable throwable) {
        return Response.serverError().entity(new HttpServiceError(throwable)).type(MediaType.APPLICATION_JSON_TYPE).build();
    }
}
