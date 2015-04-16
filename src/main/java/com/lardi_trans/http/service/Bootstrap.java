package com.lardi_trans.http.service;

import com.lardi_trans.http.service.config.HttpServiceConfig;
import com.lardi_trans.http.service.config.NetworkConfig;
import org.apache.commons.lang3.StringUtils;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.NetworkListener;
import org.glassfish.grizzly.threadpool.ThreadPoolConfig;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

import java.io.IOException;
import java.net.URI;


/**
 * Created by Andrey on 08.03.2015.
 */
public class Bootstrap {
    final private static Logger LOGGER = LoggerFactory.getLogger(Bootstrap.class);
    final private HttpServer server;

    private Bootstrap(HttpServiceConfig config) throws Exception{
        URI baseUri = config.getServerURI();
        server = GrizzlyHttpServerFactory.createHttpServer(baseUri, getApplication(config), false);

        configureServer(config);

        try {
            server.start();
        } catch (final IOException ex) {
            server.shutdownNow();
            throw new Exception("fail to start server", ex);
        }

        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                doCorrectShutdown();
            }
        });

        LOGGER.info("Start service at {}", baseUri);
        LOGGER.info("Wadl available by {}/application.wadl", baseUri);
        LOGGER.info("Swagger api available by {}/api", baseUri);

        if (System.getProperty("soa_constants_url") == null) {
            LOGGER.warn("lardi constants soa not available");
        }

        Thread.currentThread().join();

        doCorrectShutdown();
    }

    public static void main(String[] args) throws Exception {
        SLF4JBridgeHandler.removeHandlersForRootLogger();
        SLF4JBridgeHandler.install();

        new Bootstrap(HttpServiceConfig.getConfiguration());
    }

    private void configureServer(HttpServiceConfig config) {
        server.getServerConfiguration().setJmxEnabled(true);

        NetworkConfig networkConfig = config.getNetworkConfig();
        if (networkConfig != null) {
            NetworkListener listener = server.getListener("grizzly");

            listener.setTransactionTimeout(networkConfig.getTransactionTimeout());

            listener.getCompressionConfig().setCompressionMode(networkConfig.getCompression());

            ThreadPoolConfig threadPoolConfig = listener.getTransport().getWorkerThreadPoolConfig();
            threadPoolConfig.setCorePoolSize(networkConfig.getWorkersCoreSize());
            threadPoolConfig.setMaxPoolSize(networkConfig.getWorkersMaxSize());
            threadPoolConfig.setQueueLimit(networkConfig.getWorkersQueryLimit());
        }
    }

    private ResourceConfig getApplication(HttpServiceConfig config) throws Exception {
        String applicationClassName = config.getApplicationClass();

        if (StringUtils.isEmpty(applicationClassName)) {
            return new HttpServiceApplication(config);
        }

        try {
            Class<?> applicationClass = Class.forName(applicationClassName);
            if (HttpServiceApplication.class.isAssignableFrom(applicationClass)) {
                return (HttpServiceApplication) applicationClass.getConstructor(HttpServiceConfig.class).newInstance(config);
            } else {
                throw new RuntimeException("applicationClass must inheritance from HttpServiceApplication!");
            }
        } catch (Exception e) {
            System.out.println("Fail to create application: " + applicationClassName);
            throw e;
        }
    }

    private void doCorrectShutdown() {
        System.out.println("Wait for http server shutdown...");
        try {
            server.shutdown().get();
            System.out.println("Shutdown ok...");
        } catch (Exception e) {
            System.out.println("Error while server shutdown!");
            e.printStackTrace();
        }
    }


}
