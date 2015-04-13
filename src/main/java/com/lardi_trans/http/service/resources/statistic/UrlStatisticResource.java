package com.lardi_trans.http.service.resources.statistic;

import com.lardi_trans.http.service.api.annotation.*;
import com.lardi_trans.http.service.error.HttpServiceError;
import org.glassfish.jersey.server.monitoring.ExecutionStatistics;
import org.glassfish.jersey.server.monitoring.MonitoringStatistics;
import org.glassfish.jersey.server.monitoring.ResourceStatistics;
import org.glassfish.jersey.server.monitoring.TimeWindowStatistics;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Andrey on 09.03.2015.
 */
@Singleton
@Produces({"application/json"})
@ApiCategory("service")
public class UrlStatisticResource {
    @Inject
    Provider<MonitoringStatistics> monitoringStatisticsProvider;

    @GET
    @Path("{time}")
    @ApiMethod("Service requests monitoring")
    @ApiResponses({
            @ApiResponse("Statistics per request"),
            @ApiResponse(value = "Statistic not enable", httpCode = 500)
    })
    public Response getStatistic(@ApiParam("time window (all,1s,15s,1m,15m,1h)") @PathParam("time") String timeWindowName) {
        MonitoringStatistics monitoringStatistics = monitoringStatisticsProvider.get();
        if (monitoringStatistics == null)
            return Response.serverError().entity(new HttpServiceError("Statistic not enable")).build();

        MonitoringStatistics snapshot = monitoringStatistics.snapshot();

        long timeWindow = 0;

        switch (timeWindowName) {
            case "all":
                timeWindow = 0;
                break;
            case "1s":
                timeWindow = 1000;
                break;
            case "15s":
                timeWindow = 15000;
                break;
            case "1m":
                timeWindow = 60000;
                break;
            case "15m":
                timeWindow = 900000;
                break;
            case "1h":
                timeWindow = 3600000;
                break;
            default:
                return Response.serverError().entity(new HttpServiceError("Statistic not available for this period")).build();
        }

        return Response.ok().entity(makeStatistic(snapshot, timeWindow)).build();
    }

    protected Map<String, Object> makeStatistic(MonitoringStatistics snapshot, long timeWindow) {
        Map<String, ResourceStatistics> uriStatistics = snapshot.getUriStatistics();

        Map<String, Object> out = new HashMap<>();

        for (Map.Entry<String, ResourceStatistics> entry : uriStatistics.entrySet()) {
            String uri = entry.getKey();
            ResourceStatistics resourceStatistics = entry.getValue();
            out.put(uri, makeResourceStatistic(resourceStatistics, timeWindow));
        }

        return out;
    }

    private Map<String, Number> makeResourceStatistic(ResourceStatistics resourceStatistics, long timeWindow) {
        ExecutionStatistics requestStatistics = resourceStatistics.getRequestExecutionStatistics();
        TimeWindowStatistics timeWindowStatistics = requestStatistics.getTimeWindowStatistics().get(timeWindow);

        Map<String, Number> out = new HashMap<>();

        out.put("avgTime", timeWindowStatistics.getAverageDuration());
        out.put("minTime", timeWindowStatistics.getMinimumDuration());
        out.put("maxTime", timeWindowStatistics.getMaximumDuration());
        out.put("count", timeWindowStatistics.getRequestCount());
        out.put("rps", timeWindowStatistics.getRequestsPerSecond());

        return out;
    }
}
