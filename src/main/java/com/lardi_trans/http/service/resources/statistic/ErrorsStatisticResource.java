package com.lardi_trans.http.service.resources.statistic;

import com.lardi_trans.http.service.api.annotation.ApiCategory;
import com.lardi_trans.http.service.api.annotation.ApiMethod;
import com.lardi_trans.http.service.api.annotation.ApiResponse;
import com.lardi_trans.http.service.api.annotation.ApiResponses;
import com.lardi_trans.http.service.error.HttpServiceError;
import org.glassfish.jersey.server.monitoring.ExceptionMapperStatistics;
import org.glassfish.jersey.server.monitoring.MonitoringStatistics;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import javax.ws.rs.GET;
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
public class ErrorsStatisticResource {
    @Inject
    Provider<MonitoringStatistics> monitoringStatisticsProvider;

    @GET
    @ApiMethod(value = "Service errors monitoring")
    @ApiResponses({
            @ApiResponse("Statistics per exception"),
            @ApiResponse(value = "Statistic not enable", httpCode = 500)
    })
    public Response getStatistic() {
        MonitoringStatistics monitoringStatistics = monitoringStatisticsProvider.get();
        if (monitoringStatistics == null)
            return Response.serverError().entity(new HttpServiceError("Statistic not enable")).build();

        MonitoringStatistics snapshot = monitoringStatistics.snapshot();

        return Response.ok().entity(makeStatistic(snapshot)).build();
    }

    protected Map<String, Long> makeStatistic(MonitoringStatistics snapshot) {
        ExceptionMapperStatistics exceptionStatistics = snapshot.getExceptionMapperStatistics();

        Map<String, Long> out = new HashMap<>();

        for (Map.Entry<Class<?>, Long> entry : exceptionStatistics.getExceptionMapperExecutions().entrySet()) {
            Class<?> aClass = entry.getKey();
            Long count = entry.getValue();
            out.put(aClass.getName(), count);
        }

        return out;
    }
}
