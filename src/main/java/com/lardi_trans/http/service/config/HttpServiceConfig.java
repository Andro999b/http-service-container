package com.lardi_trans.http.service.config;

import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Andrey on 08.03.2015.
 */
public class HttpServiceConfig {
    private String host = "localhost";
    private String path = "";
    private int port = 9999;
    private String applicationClass;
    private List<String> resourcesPackages = new ArrayList<>();
    private Map<String, Object> properties = new HashMap<>();

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

    public URI getServerURI(){
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
}
