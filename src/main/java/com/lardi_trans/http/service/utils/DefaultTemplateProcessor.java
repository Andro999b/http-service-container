package com.lardi_trans.http.service.utils;

import org.glassfish.jersey.server.mvc.Viewable;
import org.glassfish.jersey.server.mvc.spi.TemplateProcessor;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;


/**
 * Created by Andrey on 09.04.2015.
 */
public class DefaultTemplateProcessor implements TemplateProcessor<String> {

    @Override
    public String resolve(String name, MediaType mediaType) {
        name = name.substring(1);

        URL resource = DefaultTemplateProcessor.class.getClassLoader().getResource(name);

        if (resource != null)
            return name;

        return null;
    }

    @Override
    public void writeTo(String name, Viewable viewable, MediaType mediaType, MultivaluedMap<String, Object> httpHeaders, OutputStream out) throws IOException {
        InputStream stream = DefaultTemplateProcessor.class.getClassLoader().getResourceAsStream(name);

        int c;
        while ((c = stream.read()) != -1) {
            out.write(c);
        }
    }
}
