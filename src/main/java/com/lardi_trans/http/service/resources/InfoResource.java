package com.lardi_trans.http.service.resources;

import com.codahale.metrics.annotation.Metered;
import com.codahale.metrics.annotation.Timed;
import com.codahale.metrics.health.HealthCheck;
import com.codahale.metrics.health.SharedHealthCheckRegistries;
import com.codahale.metrics.jvm.ThreadDump;
import com.lardi_trans.http.service.api.annotation.*;
import com.lardi_trans.http.service.config.HttpServiceConfig;
import org.joda.time.DateTime;
import org.joda.time.Interval;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.xml.ws.WebServiceException;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.lang.management.RuntimeMXBean;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.SortedMap;


/**
 * Created by Andrey on 08.03.2015.
 */
@Path("/")
@ApiCategory("service")
public class InfoResource {
    @Inject
    HttpServiceConfig config;

    @GET
    @Path("config")
    @Produces({MediaType.APPLICATION_JSON})
    @ApiMethod("Service effective (with all default values) config file")
    @Metered
    public HttpServiceConfig getConfig(){
        return config;
    }

    @GET
    @Path("info")
    @Produces({MediaType.APPLICATION_JSON})
    @ApiMethod("Service information")
    @ApiResponse("uptime, start time, systemLoad, heap usage, systemProperties")
    @Timed
    public Map<String, Object> getInfo() {
        Map<String, Object> info = new LinkedHashMap<>();

        //uptime
        RuntimeMXBean runtimeMXBean = ManagementFactory.getRuntimeMXBean();

        PeriodFormatter periodFormatter = new PeriodFormatterBuilder()
                .printZeroIfSupported()
                .appendDays().appendLiteral("d ")
                .appendHours().appendLiteral("h ")
                .appendMinutes().appendLiteral("m ")
                .appendSeconds().appendLiteral("s")
                .toFormatter();

        info.put("uptime", periodFormatter.print(new Interval(0, runtimeMXBean.getUptime()).toPeriod()));
        info.put("startTime", new DateTime(runtimeMXBean.getStartTime()).toString("yyyy-MM-dd h:mm:ss a"));

        try {
            info.put("domainName", InetAddress.getLocalHost().getHostName());
        } catch (UnknownHostException e) {
            //nop
        }

        double systemLoadAverage = ManagementFactory.getOperatingSystemMXBean().getSystemLoadAverage();
        info.put("systemLoad", systemLoadAverage);
        //memory
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        info.put("Heap Usage", heapMemoryUsage.getUsed());
        info.put("Heap Max", heapMemoryUsage.getMax());

        //system properties
        info.put("systemProperties", runtimeMXBean.getSystemProperties());

        return info;
    }

    @GET
    @Path("threads/dump")
    @Produces({MediaType.TEXT_PLAIN})
    @ApiIgnore
    public StreamingOutput getThreadsDump() throws Exception {
        return new StreamingOutput() {
            public void write(OutputStream output) throws IOException, WebApplicationException {
                try {
                    new ThreadDump(ManagementFactory.getThreadMXBean()).dump(output);
                } catch (Exception e) {
                    throw new WebApplicationException(e);
                }
            }
        };
    }

    @GET
    @Path("health")
    @ApiMethod("Return service health checks")
    @Produces({MediaType.APPLICATION_JSON})
    @ApiResponses({
            @ApiResponse("Service health checks"),
            @ApiResponse(value = "Heathcheck fail", httpCode = 500),
            @ApiResponse(value = "Heathcheck not available", httpCode = 500)
    })
    public Response getHealthCheck() {
        if (SharedHealthCheckRegistries.names().contains("healthCheck")) {
            SortedMap<String, HealthCheck.Result> healthCheck = SharedHealthCheckRegistries.getOrCreate("healthCheck").runHealthChecks();

            for (HealthCheck.Result result : healthCheck.values()) {
                if(!result.isHealthy())
                    return Response.serverError().entity(healthCheck).build();
            }

            return Response.ok(healthCheck).build();
        }

        throw new WebServiceException("Heathcheck not available");
    }
}


