package com.lardi_trans.http.service;

import com.lardi_trans.http.service.config.HttpServiceConfig;
import com.lardi_trans.http.service.error.ExceptionHandler;
import com.lardi_trans.http.service.error.WebApplicationExceptionHandler;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceApplication extends ResourceConfig{
    public HttpServiceApplication() {
        this(HttpServiceConfig.getConfiguration());
    }

    public HttpServiceApplication(final HttpServiceConfig config) {
        //set resources scan packages
        List<String> findIn = new ArrayList<>(config.getResourcesPackages());
        findIn.add("com.lardi_trans.http.service.resources");

        packages(findIn.toArray(new String[findIn.size()]));
        //bind config
        HttpConfigBinder binder = new HttpConfigBinder(config);
        register(binder);

        //Global Exception handler
        register(WebApplicationExceptionHandler.class);
        register(ExceptionHandler.class);

        setProperties(config.getProperties());
    }

    protected void setSpringApplication(ApplicationContext context){
        property("contextConfig", context);
    }

    private static class HttpConfigBinder extends AbstractBinder {
        private final HttpServiceConfig config;

        public HttpConfigBinder(HttpServiceConfig config) {
            this.config = config;
        }

        @Override
        protected void configure() {
            bind(config).to(HttpServiceConfig.class);
        }
    }
}
