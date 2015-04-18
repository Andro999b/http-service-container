package com.lardi_trans.http.service;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.SharedMetricRegistries;
import com.codahale.metrics.health.HealthCheckRegistry;
import com.codahale.metrics.health.SharedHealthCheckRegistries;
import com.codahale.metrics.health.jvm.ThreadDeadlockHealthCheck;
import com.codahale.metrics.jersey2.MetricsFeature;
import com.codahale.metrics.jvm.*;
import com.lardi_trans.http.service.api.Reader;
import com.lardi_trans.http.service.config.HttpServiceConfig;
import com.lardi_trans.http.service.error.ExceptionHandler;
import com.lardi_trans.http.service.error.WebApplicationExceptionHandler;
import com.lardi_trans.http.service.resources.MetricsResource;
import com.lardi_trans.http.service.utils.ApplicationListener;
import com.lardi_trans.http.service.utils.DefaultTemplateProcessor;
import com.lardi_trans.http.service.utils.JsonObjectMapping;
import com.wordnik.swagger.models.Info;
import com.wordnik.swagger.models.Swagger;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.mvc.MvcFeature;

import java.lang.management.ManagementFactory;
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

        register(JsonObjectMapping.class);
        //bind config
        HttpConfigBinder binder = new HttpConfigBinder(config);
        register(binder);

        //Global Exception handler
        register(ApplicationListener.class);
        register(WebApplicationExceptionHandler.class);
        register(ExceptionHandler.class);

        setProperties(config.getProperties());

        setupMetrics();
        setupSwagger(config);
    }

    private void setupMetrics() {
        if (!isProperty("metrics.disable")) {
            //metrics
            MetricRegistry metricRegistry;

            if (!isProperty("metrics.disable.jvm")) {
                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_CLASSES_METRIC);
                metricRegistry.registerAll(new ClassLoadingGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_MEMORY_METRIC);
                metricRegistry.registerAll(new MemoryUsageGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_GC_METRIC);
                metricRegistry.registerAll(new GarbageCollectorMetricSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_BUFFERS_METRIC);
                metricRegistry.registerAll(new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));

                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_THREADS_METRIC);
                metricRegistry.registerAll(new ThreadStatesGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(MetricsResource.JVM_FILES_METRIC);
                metricRegistry.register("fileDescriptors", new FileDescriptorRatioGauge());
            }

            register(new MetricsFeature(MetricsResource.HTTP_SERVICE_METRIC_REGISTRY));

            //health check
            HealthCheckRegistry healthCheckRegistry = SharedHealthCheckRegistries
                    .getOrCreate(MetricsResource.HTTP_SERVICE_HEALTH_CHECKS);
            healthCheckRegistry.register("deadlocks", new ThreadDeadlockHealthCheck());
        }
    }

    private void setupSwagger(HttpServiceConfig config) {
        //setup swagger
        register(MvcFeature.class);
        register(DefaultTemplateProcessor.class);

        register(new SwaggerBinder(config));
    }

    private class HttpConfigBinder extends AbstractBinder {
        private final HttpServiceConfig config;

        public HttpConfigBinder(HttpServiceConfig config) {
            this.config = config;
        }

        @Override
        protected void configure() {
            bind(config).to(HttpServiceConfig.class);
        }
    }

    private class SwaggerBinder extends AbstractBinder {
        private final HttpServiceConfig config;

        public SwaggerBinder(HttpServiceConfig config) {
            this.config = config;
        }

        @Override
        protected void configure() {
            Swagger swagger = Reader.read(getClasses());
            swagger.setInfo(new Info().title(config.getTitle()));
            swagger.setHost(config.getHost() + ":" + config.getPort());
            swagger.setBasePath(config.getPath());

            bind(swagger).to(Swagger.class);
        }
    }
}
