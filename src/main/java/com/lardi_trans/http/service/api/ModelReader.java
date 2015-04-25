package com.lardi_trans.http.service.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wordnik.swagger.converter.ModelConverter;
import com.wordnik.swagger.converter.ModelConverterContextImpl;
import com.wordnik.swagger.jackson.ModelResolver;
import com.wordnik.swagger.models.Model;
import com.wordnik.swagger.models.properties.Property;

import java.lang.reflect.Type;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by Andrey on 25.04.2015.
 */
public class ModelReader {
    private final List<ModelConverter> converters;
    private final Set<String> skippedPackages = new HashSet<String>();
    private final Set<String> skippedClasses = new HashSet<String>();

    public ModelReader(ObjectMapper mapper) {
        this.converters = new CopyOnWriteArrayList<>();
        this.converters.add(new ModelResolver(mapper));
        this.skippedPackages.add("java.lang");
    }

    public void addConverter(ModelConverter converter) {
        converters.add(0, converter);
    }

    public void removeConverter(ModelConverter converter) {
        converters.remove(converter);
    }

    public void addPackageToSkip(String pkg) {
        this.skippedPackages.add(pkg);
    }

    public void addClassToSkip(String cls) {
        this.skippedClasses.add(cls);
    }

    public Property readAsProperty(Type type) {
        ModelConverterContextImpl context = createModelConverterContext();
        return context.resolveProperty(type, null);
    }

    public Map<String, Model> read(Type type) {
        Map<String, Model> modelMap = new HashMap<>();
        if (shouldProcess(type)) {
            ModelConverterContextImpl context = createModelConverterContext();
            Model resolve = context.resolve(type);
            for (Map.Entry<String, Model> entry : context.getDefinedModels().entrySet()) {
                if (entry.getValue().equals(resolve)) {
                    modelMap.put(entry.getKey(), entry.getValue());
                }
            }
        }
        return modelMap;
    }

    public Map<String, Model> readAll(Type type) {
        if (shouldProcess(type)) {
            ModelConverterContextImpl context = createModelConverterContext();
            context.resolve(type);
            return context.getDefinedModels();
        }
        return new HashMap<>();
    }

    public ModelConverterContextImpl createModelConverterContext() {
        return new ModelConverterContextImpl(converters);
    }

    private boolean shouldProcess(Type type) {
        boolean process = true;
        if (type instanceof Class<?>) {
            Class<?> cls = (Class<?>) type;
            String className = cls.getName();
            for (String packageName : skippedPackages) {
                if (className.startsWith(packageName)) {
                    process = false;
                }
            }
            for (String classToSkip : skippedClasses) {
                if (className.equals(classToSkip)) {
                    process = false;
                }
            }
        }
        return process;
    }
}
