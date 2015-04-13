package com.lardi_trans.http.service.resources;

import com.lardi_trans.http.service.api.annotation.ApiCategory;
import com.lardi_trans.http.service.api.annotation.ApiMethod;
import com.lardi_trans.http.service.api.annotation.ApiResponse;
import com.lardi_trans.http.service.config.HttpServiceConfig;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.lang.management.RuntimeMXBean;
import java.util.LinkedHashMap;
import java.util.Map;

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
    @Produces({"application/json"})
    @ApiMethod("Service effective (with all default values) config file")
    public HttpServiceConfig getConfig(){
        return config;
    }

    @GET
    @Path("info")
    @Produces({"application/json"})
    @ApiMethod("Service information")
    @ApiResponse("uptime, start time, systemLoad, heap usage, systemProperties")
    public Map<String, Object> getIndex(){
        Map<String, Object> metrics = new LinkedHashMap<>();

        //uptime
        RuntimeMXBean runtimeMXBean = ManagementFactory.getRuntimeMXBean();

        Period uptime = new Period(runtimeMXBean.getUptime());
        PeriodFormatter periodFormatter = new PeriodFormatterBuilder()
                .printZeroAlways()
                .appendDays().appendLiteral("d ")
                .appendHours().appendLiteral("h ")
                .appendMinutes().appendLiteral("m ")
                .appendSeconds().appendLiteral("s")
                .toFormatter();

        metrics.put("uptime", periodFormatter.print(uptime));
        metrics.put("startTime", new DateTime(runtimeMXBean.getStartTime()).toString("yyyy-MM-dd h:mm:ss a"));

        double systemLoadAverage = ManagementFactory.getOperatingSystemMXBean().getSystemLoadAverage();
        metrics.put("systemLoad", systemLoadAverage);
        //memory
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

        MemoryUsage heapMemoryUsage = memoryMXBean.getHeapMemoryUsage();
        metrics.put("Heap Usage", heapMemoryUsage.getUsed());
        metrics.put("Heap Max", heapMemoryUsage.getMax());

        //system properties
        metrics.put("systemProperties", runtimeMXBean.getSystemProperties());

        return metrics;
    }

    @Path("")
    public Class<ApiResource> getApi() {
        return ApiResource.class;
    }
}

