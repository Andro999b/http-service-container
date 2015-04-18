package com.lardi_trans.http.service.optional;

import com.lardi_trans.http.service.optional.statistic.ErrorsStatisticResource;
import com.lardi_trans.http.service.optional.statistic.UrlStatisticResource;

import javax.ws.rs.Path;

/**
 * Created by Andrey on 18.04.2015.
 */
@Path("/statistic")
public class StatisticResource {

    @Path("/errors")
    public Class<ErrorsStatisticResource> getErrorsStatistics() {
        return ErrorsStatisticResource.class;
    }

    @Path("/")
    public Class<UrlStatisticResource> getRequestStatistics() {
        return UrlStatisticResource.class;
    }
}