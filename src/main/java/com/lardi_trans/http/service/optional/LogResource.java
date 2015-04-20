package com.lardi_trans.http.service.optional;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import com.lardi_trans.http.service.api.annotation.ApiIgnore;
import com.lardi_trans.http.service.utils.HtmlAppender;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by Andrey on 18.04.2015.
 */
@Path("log")
@ApiIgnore
public class LogResource {
    @GET
    @Produces({"text/html"})
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
