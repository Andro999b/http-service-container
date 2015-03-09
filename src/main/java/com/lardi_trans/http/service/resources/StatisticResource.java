package com.lardi_trans.http.service.resources;

import com.lardi_trans.http.service.resources.statistic.ErrorsStatisticResource;
import com.lardi_trans.http.service.resources.statistic.UrlStatisticResource;

import javax.ws.rs.Path;

/**
 * Created by Andrey on 09.03.2015.
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
