package com.lardi_trans.http.service.resources;

import javax.ws.rs.*;

/**
 * Created by Andrey on 20.04.2015.
 */
@Path("test")
public class TestApi {
    @GET
    public String testGet() {
        return "";
    }

    @POST
    public String testPost() {
        return "";
    }

    @PUT
    public String testPut() {
        return "";
    }

    @DELETE
    public String testDelete() {
        return "";
    }
}
