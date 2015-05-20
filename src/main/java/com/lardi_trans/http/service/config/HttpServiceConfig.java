package com.lardi_trans.http.service.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.UriBuilder;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceConfig {
    final private static Logger LOGGER = LoggerFactory.getLogger(HttpServiceConfig.class);

    private String title = "HTTP service";
    private NetworkConfig networkConfig = new NetworkConfig();
    private String host = "localhost";
    private String path = "";
    private int port = 9999;
    private String applicationClass;
    private String constantsUrl;
    private String webIndexPage = "api.html";
    private List<String> resourcesPackages = new ArrayList<>();
    private Map<String, Object> properties = new HashMap<>();
    private int slowRequestLogTime = 1000;

    private HttpServiceConfig() {
    }

    public static HttpServiceConfig getConfiguration() {
        HttpServiceConfig config;
        File file = null;

        String uri = System.getProperty("service.config");

        try {
            if (uri != null) {
                file = new File(uri);
            } else {
                URL resource = HttpServiceConfig.class.getClassLoader().getResource("config.json");
                if (resource != null) {
                    file = new File(resource.toURI());
                }
            }

            if (file != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                config = objectMapper.readValue(file, HttpServiceConfig.class);
            } else {
                config = new HttpServiceConfig();
            }
        } catch (IOException | URISyntaxException e) {
            LOGGER.error("Error to load configuration file", e);
            throw new RuntimeException("Error to load configuration file", e);
        }


        config.setHost(System.getProperty("service.host", config.getHost()));

        String alternativePort = System.getProperty("service.port");
        if (alternativePort != null) {
            try {
                config.setPort(Integer.parseInt(alternativePort));
            } catch (NumberFormatException e) {
                LOGGER.error("Bad alternative port {}! Port {} will be used", alternativePort, config.getPort());
            }
        }

        if (!StringUtils.isEmpty(config.getConstantsUrl())) {
            System.setProperty("soa_constants_url", config.getConstantsUrl());
        }

        return config;
    }

    public String getTitle() {
        return title;
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

    public int getSlowRequestLogTime() {
        return slowRequestLogTime;
    }

    public String getWebIndexPage() {
        return webIndexPage;
    }
}
