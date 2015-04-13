package com.lardi_trans.http.service.api;

import com.lardi_trans.http.service.api.annotation.*;
import com.wordnik.swagger.converter.ModelConverters;
import com.wordnik.swagger.models.*;
import com.wordnik.swagger.models.Path;
import com.wordnik.swagger.models.parameters.Parameter;
import com.wordnik.swagger.models.properties.ArrayProperty;
import com.wordnik.swagger.models.properties.MapProperty;
import com.wordnik.swagger.models.properties.Property;
import com.wordnik.swagger.models.properties.RefProperty;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.*;
import java.lang.annotation.Annotation;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.*;

/**
 * Created by Andrey on 08.04.2015.
 */
public class Reader {
    private Swagger swagger;
    private ParameterReader parameterReader;

    private Reader() {
        this.swagger = new Swagger();
        this.parameterReader = new ParameterReader(swagger);
    }

    public static Reader create() {
        return new Reader();
    }

    public static Swagger read(Set<Class<?>> cls) {
        Reader reader = new Reader();

        for (Class<?> cl : cls) {
            reader.readResource(cl);
        }

        return reader.getSwagger();
    }

    public Swagger getSwagger() {
        return swagger;
    }

    public void readResource(Class<?> cls) {
        if (isIgnored(cls)) return;

        javax.ws.rs.Path resourcePathAnnotation = cls.getAnnotation(javax.ws.rs.Path.class);

        if (resourcePathAnnotation != null) {
            String resourcePath = resourcePathAnnotation.value();
            Method[] methods = cls.getMethods();
            for (Method method : methods) {
                readResourceMethod(resourcePath, cls, method, null);
            }
        }
    }

    private void readResourceMethod(String resourcePath, Class resource, Method method, List<Parameter> parameters) {
        if (isIgnored(method)) return;

        javax.ws.rs.Path methodPathAnnotation = method.getAnnotation(javax.ws.rs.Path.class);
        String httpMethod = getHttpMethod(method);

        if (httpMethod != null) {
            //operation path and regexps
            String methodPath = "";
            if (methodPathAnnotation != null)
                methodPath = methodPathAnnotation.value();

            String[] pps = appendPath(resourcePath, methodPath).split("/");
            String[] pathParts = new String[pps.length];
            Map<String, String> regexMap = new HashMap<>();

            for (int i = 0; i < pps.length; i++) {
                String p = pps[i];
                if (p.startsWith("{")) {
                    int pos = p.indexOf(":");
                    if (pos > 0) {
                        String left = p.substring(1, pos);
                        String right = p.substring(pos + 1, p.length() - 1);
                        pathParts[i] = "{" + left + "}";
                        regexMap.put(left, right);
                    } else
                        pathParts[i] = p;
                } else pathParts[i] = p;
            }

            String operationPath;
            if (pathParts.length == 0) {
                operationPath = "/";
            } else {
                StringBuilder pathBuilder = new StringBuilder();
                for (String p : pathParts) {
                    if (!p.isEmpty()) pathBuilder.append("/").append(p);
                }
                operationPath = pathBuilder.toString();
            }

            //create operation description
            Operation operation = readMethod(method);

            //add parent params
            if (parameters != null) {
                for (Parameter parameter : parameters) {
                    operation.parameter(parameter);
                }
            }

            //add params patterns
            for (Parameter param : operation.getParameters()) {
                if (regexMap.get(param.getName()) != null) {
                    String pattern = regexMap.get(param.getName());
                    param.setPattern(pattern);
                }
            }

            //set resource consumes
            if (operation.getConsumes() == null) {
                Consumes annotation = (Consumes) resource.getAnnotation(Consumes.class);
                if (annotation != null) {
                    for (String mediaType : annotation.value())
                        operation.consumes(mediaType);
                }
            }

            //set resource produces
            if (operation.getProduces() == null) {
                Produces annotation = (Produces) resource.getAnnotation(Produces.class);
                if (annotation != null) {
                    for (String mediaType : annotation.value())
                        operation.produces(mediaType);
                }
            }

            addMethodDescription(resource, method, operation);

            Path path = new Path();
            path.set(httpMethod, operation);
            swagger.path(operationPath, path);
        } else if (methodPathAnnotation != null) {
            Class<?> returnType = method.getReturnType();
            Class subResourceClass;
            if (returnType.isAssignableFrom(Class.class)) {
                ParameterizedType type = (ParameterizedType) method.getGenericReturnType();
                subResourceClass = (Class) type.getActualTypeArguments()[0];
            } else {
                subResourceClass = returnType;
            }

            readSubResource(
                    subResourceClass,
                    appendPath(resourcePath, methodPathAnnotation.value()),
                    extractParams(method)
            );
        }
    }

    private void readSubResource(Class cls, String parentPath, List<Parameter> parameters) {
        if (isIgnored(cls)) return;

        Method[] methods = cls.getMethods();
        for (Method method : methods) {
            readResourceMethod(parentPath, cls, method, parameters);
        }
    }

    private String appendPath(String resourcePath, String methodPath) {
        String out = resourcePath.startsWith("/") ? resourcePath : "/" + resourcePath;

        if (out.endsWith("/"))
            out = out.substring(0, out.length() - 1);

        out += methodPath.startsWith("/") ? methodPath : "/" + methodPath;

        return out;
    }

    private String getHttpMethod(Method method) {
        if (method.getAnnotation(GET.class) != null)
            return "get";
        else if (method.getAnnotation(PUT.class) != null)
            return "put";
        else if (method.getAnnotation(POST.class) != null)
            return "post";
        else if (method.getAnnotation(DELETE.class) != null)
            return "delete";
        else if (method.getAnnotation(OPTIONS.class) != null)
            return "options";
        else if (method.getAnnotation(HEAD.class) != null)
            return "head";
        else if (method.getAnnotation(HttpMethod.class) != null) {
            HttpMethod httpMethod = method.getAnnotation(HttpMethod.class);
            return httpMethod.value().toLowerCase();
        } else
            return null;
    }

    public Operation readMethod(Method method) {
        Operation operation = new Operation();
        operation.operationId(method.getName());

        //response
        Class<?> responseClass;
        String responseMsg;
        int responseCode;

        ApiResponses apiResponses = method.getAnnotation(ApiResponses.class);
        ApiResponse apiResponse = method.getAnnotation(ApiResponse.class);
        if (apiResponses != null) {
            for (ApiResponse response : apiResponses.value()) {
                readResponse(
                        operation,
                        response.model(),
                        response.value(),
                        response.httpCode(),
                        response.container()
                );
            }
        } else if (apiResponse != null) {
            readResponse(
                    operation,
                    apiResponse.model(),
                    apiResponse.value(),
                    apiResponse.httpCode(),
                    apiResponse.container()
            );
        } else {
            responseClass = method.getReturnType();
            responseMsg = "success response";
            responseCode = 200;
            readResponse(operation, responseClass, responseMsg, responseCode, ApiContainerType.NONE);
        }


        if (operation.getResponses() == null) {
            operation.defaultResponse(new Response().description("success response"));
        }
        //consumes
        Annotation annotation = method.getAnnotation(Consumes.class);
        if (annotation != null) {
            String[] apiConsumes = ((Consumes) annotation).value();
            for (String mediaType : apiConsumes)
                operation.consumes(mediaType);
        }

        //produces
        annotation = method.getAnnotation(Produces.class);
        if (annotation != null) {
            String[] apiProduces = ((Produces) annotation).value();
            for (String mediaType : apiProduces)
                operation.produces(mediaType);
        }

        //params
        operation.setParameters(extractParams(method));

        //deprecation
        if (method.getAnnotation(Deprecated.class) != null)
            operation.deprecated(true);
        else
            operation.deprecated(false);

        //description
        ApiParam apiParam = method.getAnnotation(ApiParam.class);
        if (apiParam != null) {
            operation.setDescription(apiParam.value());
        }

        return operation;
    }

    private void readResponse(Operation operation, Class<?> responseClass, String responseMsg, int responseCode, ApiContainerType container) {
        if (responseClass != null &&
                !responseClass.equals(Void.class) &&
                !responseClass.equals(javax.ws.rs.core.Response.class)) {
            if (isPrimitive(responseClass)) {
                addResponse(
                        operation,
                        ModelConverters.getInstance().readAsProperty(responseClass),
                        responseMsg,
                        responseCode,
                        container
                );
            } else {
                Map<String, Model> models = ModelConverters.getInstance().read(responseClass);
                if (models.size() == 0) {
                    addResponse(
                            operation,
                            ModelConverters.getInstance().readAsProperty(responseClass),
                            responseMsg,
                            responseCode,
                            container
                    );
                } else {
                    for (String key : models.keySet()) {
                        addResponse(
                                operation,
                                new RefProperty().asDefault(key),
                                responseMsg,
                                responseCode,
                                container
                        );
                        swagger.model(key, models.get(key));
                    }
                }
                models = ModelConverters.getInstance().readAll(responseClass);
                for (String key : models.keySet()) {
                    swagger.model(key, models.get(key));
                }
            }
        } else {
            operation.response(responseCode, new Response().description(responseMsg));
        }
    }

    private void addResponse(Operation operation, Property property, String responseMsg, int responseCode, ApiContainerType container) {
        switch (container) {
            case ARRAY:
                property = new ArrayProperty(property);
                break;
            case OBJECT:
                property = new MapProperty(property);
        }

        operation.response(responseCode, new Response()
                .description(responseMsg)
                .schema(property));
    }

    private List<Parameter> extractParams(Method method) {
        Class[] parameterTypes = method.getParameterTypes();
        Annotation[][] paramAnnotations = method.getParameterAnnotations();
        List<Parameter> parameters = new ArrayList<>();
        for (int i = 0; i < parameterTypes.length; i++) {
            Class<?> cls = parameterTypes[i];
            parameters.addAll(getParameters(cls, paramAnnotations[i]));
        }
        return parameters;
    }

    private List<Parameter> getParameters(Class<?> cls, Annotation[] annotations) {
        return parameterReader.extractParameters(annotations, cls);
    }

    boolean isPrimitive(Class<?> cls) {
        Property property = ModelConverters.getInstance().readAsProperty(cls);

        if (property == null)
            return false;

        switch (property.getType()) {
            case "integer":
            case "number":
            case "boolean":
            case "array":
            case "file":
                return true;
        }

        return false;
    }

    private void addMethodDescription(Class resource, Method method, Operation operation) {
        ApiMethod apiMethod = method.getAnnotation(ApiMethod.class);
        if (apiMethod != null) {
            operation.setSummary(apiMethod.value());

            if (!StringUtils.isEmpty(apiMethod.details())) {
                operation.setDescription(apiMethod.details());
            }
        }

        ApiCategory apiCategory = method.getAnnotation(ApiCategory.class);
        if (apiCategory != null) {
            operation.addTag(apiCategory.value());
        } else {
            apiCategory = (ApiCategory) resource.getAnnotation(ApiCategory.class);
            if (apiCategory != null) {
                operation.addTag(apiCategory.value());
            }
        }
    }

    private boolean isIgnored(AnnotatedElement annotatedElement) {
        return annotatedElement.getAnnotation(ApiIgnore.class) != null;
    }
}