package com.lardi_trans.http.service;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
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
import com.lardi_trans.http.service.optional.JvmMetricsResource;
import com.lardi_trans.http.service.optional.LogResource;
import com.lardi_trans.http.service.optional.MetricsResource;
import com.lardi_trans.http.service.optional.StatisticResource;
import com.lardi_trans.http.service.utils.ApplicationListener;
import com.lardi_trans.http.service.utils.DefaultTemplateProcessor;
import com.lardi_trans.http.service.utils.HtmlAppender;
import com.lardi_trans.http.service.utils.JsonObjectMapping;
import com.wordnik.swagger.models.Info;
import com.wordnik.swagger.models.Swagger;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.mvc.MvcFeature;
import org.slf4j.LoggerFactory;

import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceApplication extends ResourceConfig{
    public HttpServiceApplication(final HttpServiceConfig config) {
        //set resources scan packages
        List<String> findIn = new ArrayList<>(config.getResourcesPackages());
        findIn.add("com.lardi_trans.http.service.resources");

        packages(findIn.toArray(new String[findIn.size()]));

        register(JsonObjectMapping.class);
        //bind config
        HttpConfigBinder binder = new HttpConfigBinder(config);
        register(binder);

        //application listener
        register(WebApplicationExceptionHandler.class);

        //Global Exception handler
        register(ApplicationListener.class);
        register(ExceptionHandler.class);

        setProperties(config.getProperties());

        setupLog();
        setupMetrics();
        setupStatistic();
        setupSwagger(config);
    }

    private void setupStatistic() {
        if (isProperty(ServerProperties.MONITORING_ENABLED)) {
            register(StatisticResource.class);
        }
    }

    private void setupLog() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        Logger logger = loggerContext.getLogger(Logger.ROOT_LOGGER_NAME);

        HtmlAppender appender = (HtmlAppender) logger.getAppender("HTML");

        if (appender != null) {
            register(LogResource.class);
        }
    }

    private void setupMetrics() {
        if (isProperty("metrics.enable")) {
            //metrics
            MetricRegistry metricRegistry;

            if (isProperty("metrics.enable.jvm")) {
                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_CLASSES_METRIC);
                metricRegistry.registerAll(new ClassLoadingGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_MEMORY_METRIC);
                metricRegistry.registerAll(new MemoryUsageGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_GC_METRIC);
                metricRegistry.registerAll(new GarbageCollectorMetricSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_BUFFERS_METRIC);
                metricRegistry.registerAll(new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));

                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_THREADS_METRIC);
                metricRegistry.registerAll(new ThreadStatesGaugeSet());

                metricRegistry = SharedMetricRegistries.getOrCreate(JvmMetricsResource.JVM_FILES_METRIC);
                metricRegistry.register("fileDescriptors", new FileDescriptorRatioGauge());
                register(JvmMetricsResource.class);
            }

            register(new MetricsFeature(MetricsResource.HTTP_SERVICE_METRIC_REGISTRY));
            register(MetricsResource.class);
        }

        //health check
        HealthCheckRegistry healthCheckRegistry = SharedHealthCheckRegistries.getOrCreate("healthCheck");
        healthCheckRegistry.register("deadlocks", new ThreadDeadlockHealthCheck());
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
