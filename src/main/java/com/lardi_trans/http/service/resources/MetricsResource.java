package com.lardi_trans.http.service.resources;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.SharedMetricRegistries;
import com.codahale.metrics.health.HealthCheck;
import com.codahale.metrics.health.SharedHealthCheckRegistries;
import com.lardi_trans.http.service.api.annotation.*;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.xml.ws.WebServiceException;
import java.util.Map;

/**
 * Created by Andrey on 17.04.2015.
 */
@Path("metrics")
@Produces("application/json")
@ApiCategory("service")
public class MetricsResource {
    public static final String HTTP_SERVICE_METRIC_REGISTRY = "service";
    public static final String HTTP_SERVICE_HEALTH_CHECKS = "health-checks";

    public static final String JVM_CLASSES_METRIC = "jvm-classes-metrics";
    public static final String JVM_MEMORY_METRIC = "jvm-memory-metrics";
    public static final String JVM_GC_METRIC = "jvm-gc-metrics";
    public static final String JVM_BUFFERS_METRIC = "jvm-buffers-metrics";
    public static final String JVM_THREADS_METRIC = "jvm-threads-metrics";
    public static final String JVM_FILES_METRIC = "jvm-files-metrics";

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

    @GET
    @Path("health")
    @ApiMethod("Return service health checks")
    @ApiResponses({
            @ApiResponse("Service health checks"),
            @ApiResponse(value = "Metrics disabled", httpCode = 500)
    })
    public Map<String, HealthCheck.Result> getHealthCheck() {
        if (SharedHealthCheckRegistries.names().contains(HTTP_SERVICE_HEALTH_CHECKS))
            return SharedHealthCheckRegistries.getOrCreate(HTTP_SERVICE_HEALTH_CHECKS).runHealthChecks();

        throw new WebServiceException("Metrics not available");
    }
}
