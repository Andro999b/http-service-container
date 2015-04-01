package com.lardi_trans.http.service.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.StringUtils;

import javax.ws.rs.core.UriBuilder;
import java.io.File;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceConfig {
    private NetworkConfig networkConfig = new NetworkConfig();
    private String host = "localhost";
    private String path = "";
    private int port = 9999;
    private String applicationClass;
    private String constantsUrl;
    private List<String> resourcesPackages = new ArrayList<>();
    private Map<String, Object> properties = new HashMap<>();

    private HttpServiceConfig() {
    }

    public static HttpServiceConfig getConfiguration() {
        HttpServiceConfig config;
        File file;

        String uri = System.getProperty("service.config");
        try {
            if (uri != null) {
                file = new File(uri);
            } else {
                URL resource = HttpServiceConfig.class.getClassLoader().getResource("config.json");
                if (resource == null)
                    throw new RuntimeException("Can`t find config.json on classpath or service.config system property");

                file = new File(resource.toURI());
            }

            ObjectMapper objectMapper = new ObjectMapper();
            config = objectMapper.readValue(file, HttpServiceConfig.class);
        } catch (Exception e) {
            System.out.println("Error while load config file: " + uri);
            throw new RuntimeException(e);
        }

        config.setHost(System.getProperty("service.host", config.getHost()));

        String alternativePort = System.getProperty("service.port");
        if (alternativePort != null) {
            try {
                config.setPort(Integer.parseInt(alternativePort));
            } catch (NumberFormatException e) {
                System.out.println("Bad alternative port " + alternativePort +
                        "! Port " + String.valueOf(config.getPort() + " will be used"));
            }
        }

        if (!StringUtils.isEmpty(config.getConstantsUrl())) {
            System.setProperty("soa_constants_url", config.getConstantsUrl());
        }

        return config;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public List<String> getResourcesPackages() {
        return resourcesPackages;
    }

    public URI getServerURI() {
        return UriBuilder.fromPath(path).scheme("http").host(host).port(port).build();
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public String getPath() {
        return path;
    }

    public String getApplicationClass() {
        return applicationClass;
    }

    public String getConstantsUrl() {
        return constantsUrl;
    }

    public NetworkConfig getNetworkConfig() {
        return networkConfig;
    }


}
