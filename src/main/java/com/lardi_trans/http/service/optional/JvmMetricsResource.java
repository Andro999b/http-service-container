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
 * Created by Andrey on 18.04.2015.
 */
@Path("metrics")
@Produces("application/json")
@ApiCategory("service")
public class JvmMetricsResource {
    public static final String JVM_CLASSES_METRIC = "jvm-classes-metrics";
    public static final String JVM_MEMORY_METRIC = "jvm-memory-metrics";
    public static final String JVM_GC_METRIC = "jvm-gc-metrics";
    public static final String JVM_BUFFERS_METRIC = "jvm-buffers-metrics";
    public static final String JVM_THREADS_METRIC = "jvm-threads-metrics";
    public static final String JVM_FILES_METRIC = "jvm-files-metrics";

    @GET
    @Path("jvm/{type}")
    @ApiMethod(
            value = "Return jvm metrics",
            details = "Returm metrics like: <br/>" +
                    "1) Current heap and permget|metaspace memory usage <br/>" +
                    "2) Direct and mapped buffers usage <br/>" +
                    "3) Classes loaded <br/>" +
                    "4) Thread status <br/>" +
                    "5) File Descriptors <br/>" +
                    "6) Garbage collector"
    )
    @ApiResponses({
            @ApiResponse("Service metrics"),
            @ApiResponse(value = "Metrics disabled", httpCode = 500)
    })
    public MetricRegistry getJvmMetricRegistry(
            @PathParam("type")
            @ApiParam("classes|memory|gc|threads|buffers|files")
            String type) {
        String metricsRegistryName = "jvm-" + type + "-metrics";
        if (SharedMetricRegistries.names().contains(metricsRegistryName))
            return SharedMetricRegistries.getOrCreate(metricsRegistryName);

        throw new WebServiceException("Metrics not available");
    }
}
