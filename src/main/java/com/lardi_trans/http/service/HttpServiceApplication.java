package com.lardi_trans.http.service;

import com.lardi_trans.http.service.config.HttpServiceConfig;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceApplication extends ResourceConfig{
    private static final Logger LOGGER = Logger.getLogger(HttpServiceApplication.class.getName());

    public HttpServiceApplication(final HttpServiceConfig config) {
        //set resources scan packages
        List<String> findIn = new ArrayList<>(config.getResourcesPackages());
        findIn.add("com.lardi_trans.http.service.resources");

        packages(findIn.toArray(new String[findIn.size()]));
        //bind config
        HttpServiceBinder binder = new HttpServiceBinder(config);
        register(binder);

        setProperties(config.getProperties());
        property(ServerProperties.MONITORING_STATISTICS_MBEANS_ENABLED, "true");
    }

    protected void setSpringApplication(ApplicationContext context){
        property("contextConfig", context);
    }

    private static class HttpServiceBinder extends AbstractBinder {
        private final HttpServiceConfig config;

        public HttpServiceBinder(HttpServiceConfig config) {
            this.config = config;
        }

        @Override
        protected void configure() {
            bind(config).to(HttpServiceConfig.class);
        }
    }
}
