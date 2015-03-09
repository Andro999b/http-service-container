package com.lardi_trans.http.service.resources.statistic;

import com.lardi_trans.http.service.error.HttpServiceError;
import org.glassfish.jersey.server.monitoring.ExceptionMapperStatistics;
import org.glassfish.jersey.server.monitoring.MonitoringStatistics;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Andrey on 09.03.2015.
 */
@Singleton
public class ErrorsStatisticResource {
    @Inject
    Provider<MonitoringStatistics> monitoringStatisticsProvider;

    @GET
    @Produces({"application/json"})
    public Response getStatistic(@PathParam("time") String timeWindowName) {
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
