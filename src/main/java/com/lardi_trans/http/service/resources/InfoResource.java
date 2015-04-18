package com.lardi_trans.http.service.resources;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import com.codahale.metrics.jvm.ThreadDump;
import com.lardi_trans.http.service.api.annotation.ApiCategory;
import com.lardi_trans.http.service.api.annotation.ApiIgnore;
import com.lardi_trans.http.service.api.annotation.ApiMethod;
import com.lardi_trans.http.service.api.annotation.ApiResponse;
import com.lardi_trans.http.service.config.HttpServiceConfig;
import com.lardi_trans.http.service.utils.HtmlAppender;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;
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

    @GET
    @Path("info/threads/dump")
    @Produces({"text/plain"})
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
    @Path("log")
    @Produces({"text/html"})
    @ApiIgnore
    public String getLog() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        Logger logger = loggerContext.getLogger(Logger.ROOT_LOGGER_NAME);

        HtmlAppender appender = (HtmlAppender) logger.getAppender("HTML");

        if (appender != null) {
            return appender.print();
        }

        return "Html log not available. Check you logback config";
    }
}


