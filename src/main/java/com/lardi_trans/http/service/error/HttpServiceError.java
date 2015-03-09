package com.lardi_trans.http.service.error;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Andrey on 09.03.2015.
 */
public class HttpServiceError {
    String error;
    List<String> stackTrace;
    String exceptionClass;

    public HttpServiceError(Throwable throwable) {
        error = throwable.getMessage();
        exceptionClass = throwable.getClass().getName();

        stackTrace = new ArrayList<>(throwable.getStackTrace().length);

        for (StackTraceElement stackTraceElement : throwable.getStackTrace()) {
            stackTrace.add(stackTraceElement.toString());
        }
    }

    public HttpServiceError(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public List<String> getStackTrace() {
        return stackTrace;
    }

    public String getExceptionClass() {
        return exceptionClass;
    }
}
