package com.lardi_trans.http.service.resources;

import com.codahale.metrics.annotation.Metered;
import com.lardi_trans.http.service.api.annotation.ApiIgnore;
import com.lardi_trans.http.service.error.HttpServiceError;
import com.wordnik.swagger.models.Swagger;
import org.glassfish.jersey.server.mvc.Viewable;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by Andrey on 07.04.2015.
 */
@Path("/")
@ApiIgnore
public class ApiResource {
    @Inject
    Swagger swagger;

    @GET
    @Path("api")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getApi() {
        if (swagger == null)
            return Response.serverError().entity(new HttpServiceError("Swagger api not enable")).build();

        return Response.ok().entity(swagger).build();
    }

    @GET
    @Produces({MediaType.TEXT_HTML + ";charset=utf-8"})
    public Viewable getSwaggerUi() {
        return new Viewable("/swagger-ui/index.html", this);
    }

    @GET
    @Path("{template}")
    public Viewable getSwaggerUi(@PathParam("template") String template) {
        return new Viewable("/swagger-ui/" + template, this);
    }

    @GET
    @Path("css/{template}")
    @Produces({"text/css"})
    public Viewable getSwaggerUiCss(@PathParam("template") String template) {
        return new Viewable("/swagger-ui/css/" + template, this);
    }

    @GET
    @Path("lib/{template}")
    @Produces({"application/javascript"})
    public Viewable getSwaggerUiLib(@PathParam("template") String template) {
        return new Viewable("/swagger-ui/lib/" + template, this);
    }

    @GET
    @Path("fonts/{template}")
    public Viewable getSwaggerUiFonts(@PathParam("template") String template) {
        return new Viewable("/swagger-ui/fonts/" + template, this);
    }

    @GET
    @Path("images/{template}")
    public Viewable getSwaggerUiImages(@PathParam("template") String template) {
        return new Viewable("/swagger-ui/images/" + template, this);
    }
}
