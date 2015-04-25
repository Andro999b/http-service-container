package com.lardi_trans.http.service.api;

import com.lardi_trans.http.service.api.annotation.ApiParam;
import com.lardi_trans.http.service.api.annotation.Require;
import com.wordnik.swagger.models.*;
import com.wordnik.swagger.models.parameters.*;
import com.wordnik.swagger.models.properties.Property;
import com.wordnik.swagger.models.properties.RefProperty;

import javax.ws.rs.*;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by Andrey on 07.04.2015.
 */
public class ParameterReader {
    private Swagger swagger;
    private ModelReader modelReader;

    public ParameterReader(Swagger swagger, ModelReader modelReader) {
        this.swagger = swagger;
        this.modelReader = modelReader;
    }

    public List<Parameter> extractParameters(Annotation[] annotations, Class<?> cls) {
        String defaultValue = "";

        if (this.shouldIgnoreClass(cls))
            return Collections.emptyList();

        List<Parameter> parameters = new ArrayList<>();
        Parameter parameter = null;
        boolean hasRequireAnnotation = false;
        String description = null;
        for (Annotation annotation : annotations) {
            if (annotation instanceof DefaultValue) {
                DefaultValue defaultValueAnnotation = (DefaultValue) annotation;
                defaultValue = defaultValueAnnotation.value();
            } else if (annotation instanceof QueryParam) {
                parameter = extractQueryParam(cls, defaultValue, (QueryParam) annotation);
            } else if (annotation instanceof PathParam) {
                parameter = extractPathParam(cls, defaultValue, (PathParam) annotation);
            } else if (annotation instanceof HeaderParam) {
                parameter = extractHeaderParam(cls, defaultValue, (HeaderParam) annotation);
            } else if (annotation instanceof CookieParam) {
                parameter = extractCookieParam(cls, defaultValue, (CookieParam) annotation);
            } else if (annotation instanceof FormParam) {
                parameter = extractFormParam(cls, defaultValue, (FormParam) annotation);
            } else if (annotation instanceof Require) {
                hasRequireAnnotation = true;
            } else if (annotation instanceof ApiParam) {
                description = ((ApiParam) annotation).value();
            }
        }
        if (parameter == null) {
            parameter = extractBodyParam(cls);
        }

        if (hasRequireAnnotation)
            parameter.setRequired(true);

        parameter.setDescription(description);
        parameters.add(parameter);

        return parameters;
    }

    private BodyParameter extractBodyParam(Class<?> cls) {
        // must be a body param
        BodyParameter bp = new BodyParameter();
        bp.setName("body");

        if (cls.isArray()) {
            Class<?> innerType;
            innerType = cls.getComponentType();
            Property innerProperty = modelReader.readAsProperty(innerType);
            if (innerProperty == null) {
                Map<String, Model> models = modelReader.read(innerType);
                if (models.size() > 0) {
                    for (String name : models.keySet()) {
                        if (!name.contains("java.util")) {
                            bp.setSchema(new ArrayModel().items(new RefProperty().asDefault(name)));
                        }
                    }
                }
                models = modelReader.readAll(innerType);
                if (swagger != null) {
                    for (String key : models.keySet()) {
                        swagger.model(key, models.get(key));
                    }
                }
            } else {
                bp.setSchema(new ArrayModel().items(innerProperty));
                // creation of ref property doesn't add model to definitions - do it now instead
                if (innerProperty instanceof RefProperty && swagger != null) {
                    Map<String, Model> models = modelReader.read(innerType);
                    String name = ((RefProperty) innerProperty).getSimpleRef();
                    swagger.addDefinition(name, models.get(name));
                }
            }
        } else {
            Map<String, Model> models = modelReader.read(cls);
            if (models.size() > 0) {
                for (String name : models.keySet()) {
                    if (!name.contains("java.util")) {
                        bp.setSchema(new RefModel().asDefault(name));
                        if (swagger != null)
                            swagger.addDefinition(name, models.get(name));
                    }
                }
                models = modelReader.readAll(cls);
                if (swagger != null) {
                    for (String key : models.keySet()) {
                        swagger.model(key, models.get(key));
                    }
                }
            } else {
                Property prop = modelReader.readAsProperty(cls);
                if (prop != null) {
                    ModelImpl model = new ModelImpl();
                    model.setType(prop.getType());
                    bp.setSchema(model);
                }
            }
        }

        return bp;
    }

    private Parameter extractFormParam(Class<?> cls, String defaultValue, FormParam annotation) {
        Parameter parameter;
        FormParam param = annotation;
        FormParameter p = new FormParameter().name(param.value());
        if (!defaultValue.isEmpty())
            p.setDefaultValue(defaultValue);
        Property schema = modelReader.readAsProperty(cls);
        if (schema != null)
            p.setProperty(schema);
        parameter = p;
        return parameter;
    }

    private Parameter extractCookieParam(Class<?> cls, String defaultValue, CookieParam annotation) {
        Parameter parameter;
        CookieParam param = annotation;
        CookieParameter p = new CookieParameter().name(param.value());
        if (!defaultValue.isEmpty())
            p.setDefaultValue(defaultValue);
        Property schema = modelReader.readAsProperty(cls);
        if (schema != null)
            p.setProperty(schema);
        parameter = p;
        return parameter;
    }

    private Parameter extractHeaderParam(Class<?> cls, String defaultValue, HeaderParam annotation) {
        Parameter parameter;
        HeaderParam param = annotation;
        HeaderParameter p = new HeaderParameter().name(param.value());
        p.setDefaultValue(defaultValue);
        Property schema = modelReader.readAsProperty(cls);
        if (schema != null)
            p.setProperty(schema);
        parameter = p;
        return parameter;
    }

    private Parameter extractPathParam(Class<?> cls, String defaultValue, PathParam annotation) {
        Parameter parameter;
        PathParam param = annotation;
        PathParameter p = new PathParameter().name(param.value());
        if (!defaultValue.isEmpty())
            p.setDefaultValue(defaultValue);
        Property schema = modelReader.readAsProperty(cls);
        if (schema != null)
            p.setProperty(schema);
        parameter = p;
        return parameter;
    }

    private Parameter extractQueryParam(Class<?> cls, String defaultValue, QueryParam annotation) {
        Parameter parameter;
        QueryParam param = annotation;
        QueryParameter p = new QueryParameter().name(param.value());
        if (!defaultValue.isEmpty()) {
            p.setDefaultValue(defaultValue);
        }
        Property schema = modelReader.readAsProperty(cls);
        if (schema != null)
            p.setProperty(schema);
        parameter = p;
        return parameter;
    }

    public boolean shouldIgnoreClass(Class<?> cls) {
        return cls.getName().startsWith("javax.ws.rs");
    }
}