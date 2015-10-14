package com.lardi_trans.http.service.optional;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import com.lardi_trans.http.service.api.annotation.ApiIgnore;
import com.lardi_trans.http.service.utils.HtmlAppender;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by Andrey on 18.04.2015.
 */
@Path("log")
@ApiIgnore
public class LogResource {

    @GET
    @Produces({MediaType.TEXT_PLAIN + ";charset=utf-8"})
    @ApiIgnore
    public StreamingOutput getLog() throws Exception {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        Logger logger = loggerContext.getLogger(Logger.ROOT_LOGGER_NAME);

        final HtmlAppender appender = (HtmlAppender) logger.getAppender("HTML");

        return new StreamingOutput() {
            public void write(OutputStream output) throws IOException, WebApplicationException {
                try {
                    output.write(appender.print().getBytes("UTF-8"));
                } catch (Exception e) {
                    throw new WebApplicationException(e);
                }
            }
        };
    }
}
