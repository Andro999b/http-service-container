package com.lardi_trans.http.service.optional;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.SharedMetricRegistries;
import com.lardi_trans.http.service.api.annotation.*;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.xml.ws.WebServiceException;

/**
 * Created by Andrey on 17.04.2015.
 */
@Path("metrics")
@Produces("application/json")
@ApiCategory("service")
public class MetricsResource {
    public static final String HTTP_SERVICE_METRIC_REGISTRY = "service";

    @GET
    @Path("{type}")
    @ApiMethod("Return service metrics")
    @ApiResponses({
            @ApiResponse("Service metrics"),
            @ApiResponse(value = "Metrics disabled", httpCode = 500)
    })
    public MetricRegistry getMetricRegistry(@ApiParam("name of metrics(try \"service\")") @PathParam("type") String type) {
        if (SharedMetricRegistries.names().contains(type))
            return SharedMetricRegistries.getOrCreate(type);

        throw new WebServiceException("Metrics not available");
    }
}
