package com.lardi_trans.http.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lardi_trans.http.service.config.HttpServiceConfig;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.util.StringUtils;

import java.io.File;
import java.net.URI;
import java.net.URL;


/**
 * Created by Andrey on 08.03.2015.
 */
public class Bootstrap {
    final private HttpServer server;

    private Bootstrap(HttpServiceConfig config) throws Exception{
        URI baseUri = config.getServerURI();
        server = GrizzlyHttpServerFactory.createHttpServer(baseUri, getApplication(config));

        Runtime.getRuntime().addShutdownHook(new Thread() {
           @Override
            public void run() {
                doCorrectShutdown();
            }
        });

        System.out.println("Start service at " + baseUri);
        System.out.println("Wadl available by " + baseUri + "/application.wadl");
        System.out.println("Press any key for shutdown...");
        System.in.read();

        doCorrectShutdown();
    }

    private ResourceConfig getApplication(HttpServiceConfig config) throws Exception{
        String applicationClassName = config.getApplicationClass();

        if(StringUtils.isEmpty(applicationClassName)){
            return new HttpServiceApplication(config);
        }

        try{
            Class<?> applicationClass = Class.forName(applicationClassName);
            if(HttpServiceApplication.class.isAssignableFrom(applicationClass)) {
                return (HttpServiceApplication)applicationClass.getConstructor(HttpServiceConfig.class).newInstance(config);
            }else{
                throw new RuntimeException("applicationClass must inheritance from HttpServiceApplication!");
            }
        }catch (Exception e){
            System.out.println("Fail to create application: " + applicationClassName);
            throw e;
        }
    }

    private void doCorrectShutdown()  {
        System.out.println("Wait for http server shutdown...");
        try {
            server.shutdown().get();
            System.out.println("Shutdown ok...");
        }catch (Exception e){
            System.out.println("Error while server shutdown!");
            e.printStackTrace();
        }
    }

    private static HttpServiceConfig getConfiguration() throws Exception{
        HttpServiceConfig config;
        File file;

        String uri = System.getProperty("service.config");
        if(uri != null){
            file = new File(uri);
        }else{
            URL resource = Bootstrap.class.getClassLoader().getResource("config.json");
            if(resource == null)
                throw new RuntimeException("Can`t find config.json on classpath or service.config system property");

            file = new File(resource.toURI());
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            config = objectMapper.readValue(file, HttpServiceConfig.class);
        }catch (Exception e) {
            System.out.println("Error while load config file: " + uri);
            throw e;
        }

        config.setHost(System.getProperty("service.host", config.getHost()));

        String alternativePort = System.getProperty("service.port");
        if(alternativePort != null){
            try {
                config.setPort(Integer.parseInt(alternativePort));
            }catch (NumberFormatException e){
                System.out.println("Bad alternative port " + alternativePort +
                        "! Port " + String.valueOf(config.getPort() + " will be used"));
            }
        }

        return config;
    }

    private static void start() throws Exception {
        new Bootstrap(getConfiguration());
    }

    public static void main(String[] args) throws Exception {
       Bootstrap.start();
    }


}
