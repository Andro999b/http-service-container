package com.lardi_trans.http.service.utils;

import com.lardi_trans.http.service.config.HttpServiceConfig;
import org.glassfish.jersey.server.internal.process.MappableException;
import org.glassfish.jersey.server.monitoring.ApplicationEvent;
import org.glassfish.jersey.server.monitoring.ApplicationEventListener;
import org.glassfish.jersey.server.monitoring.RequestEvent;
import org.glassfish.jersey.server.monitoring.RequestEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.beans.ExceptionListener;

/**
 * Created by Andrey on 18.04.2015.
 */
public class ApplicationListener implements ApplicationEventListener {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionListener.class);

    @Inject
    private HttpServiceConfig config;

    @Override
    public void onEvent(ApplicationEvent event) {
        //nothing
    }

    @Override
    public RequestEventListener onRequest(RequestEvent requestEvent) {
        return new RequestListener();
    }

    private class RequestListener implements RequestEventListener {
        private long startTime = 0;

        @Override
        public void onEvent(RequestEvent event) {
            switch (event.getType()) {
                case ON_EXCEPTION:
                    if (event.getException() instanceof MappableException) {
                        LOGGER.error("Exception on request {} ", event.getUriInfo().getAbsolutePath(), event.getException().getCause());
                    } else {
                        LOGGER.error("Exception on request {} ", event.getUriInfo().getAbsolutePath(), event.getException());
                    }
                    break;
                case START:
                    startTime = System.currentTimeMillis();
                    break;
                case FINISHED:
                    if (startTime > 0) {
                        long requestTime = System.currentTimeMillis() - startTime;
                        if (requestTime >= config.getSlowRequestLogTime()) {
                            LOGGER.error("Slow request {}. Execution time is {}", event.getUriInfo().getAbsolutePath(), requestTime);
                        }
                    }
                    break;
            }
        }
    }
}
