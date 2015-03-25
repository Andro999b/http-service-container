package com.lardi_trans.http.service.utils;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.core.env.PropertySource;

/**
 * Created by andro on 25.03.15.
 */
public class ResourceConfigPropertiesSource extends PropertySource<ResourceConfig> {
    public ResourceConfigPropertiesSource(String name, ResourceConfig source) {
        super(name, source);
    }

    @Override
    public Object getProperty(String name) {
        return source.getProperty(name);
    }
}
