package com.lardi_trans.http.service.utils;

import ch.qos.logback.classic.PatternLayout;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.IThrowableProxy;
import ch.qos.logback.classic.spi.StackTraceElementProxy;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.CoreConstants;
import ch.qos.logback.core.helpers.CyclicBuffer;
import ch.qos.logback.core.helpers.Transform;
import ch.qos.logback.core.pattern.Converter;
import ch.qos.logback.core.pattern.ConverterUtil;
import ch.qos.logback.core.pattern.parser.Node;
import ch.qos.logback.core.pattern.parser.Parser;
import ch.qos.logback.core.spi.ScanException;
import org.apache.commons.lang3.StringUtils;

import java.util.Collections;
import java.util.List;

/**
 * Created by Andrey on 18.04.2015.
 */
public class HtmlAppender extends AppenderBase<ILoggingEvent> {
    public static final int MAX_RECORDS = 150;
    public static final String DEFAULT_CONVERSION_PATTERN = "%date%level%logger{50}%msg";

    static final String TRACE_PREFIX = "    ";

    private CyclicBuffer<ILoggingEvent> cb = new CyclicBuffer<>(MAX_RECORDS);
    private String pattern;
    private boolean reversePrint = false;
    private Converter<ILoggingEvent> converters;

    @Override
    protected void append(ILoggingEvent event) {
        event.prepareForDeferredProcessing();
        cb.add(event);
    }

    @Override
    public void start() {
        super.start();

        if (StringUtils.isEmpty(pattern))
            pattern = DEFAULT_CONVERSION_PATTERN;

        converters = getConverter();
    }

    public void setReversePrint(boolean reversePrint) {
        this.reversePrint = reversePrint;
    }

    public String print() {
        StringBuilder sb = new StringBuilder();

        List<ILoggingEvent> iLoggingEvents = cb.asList();

        if (reversePrint)
            Collections.reverse(iLoggingEvents);

        for (ILoggingEvent event : iLoggingEvents) {
            for (Converter c = converters; c != null; c = c.getNext()) {
                sb.append(Transform.escapeTags(c.convert(event))).append(" ");
            }
            sb.append("\n");

            if (event.getThrowableProxy() != null) {
                renderThrow(sb, event.getThrowableProxy());
            }
        }

        return sb.toString();
    }

    void renderThrow(StringBuilder sbuf, IThrowableProxy tp) {
        renderThrowFirstLine(sbuf, tp);
        int commonFrames = tp.getCommonFrames();
        StackTraceElementProxy[] stepArray = tp.getStackTraceElementProxyArray();

        for (int i = 0; i < stepArray.length - commonFrames; ++i) {
            StackTraceElementProxy step = stepArray[i];
            sbuf.append(CoreConstants.LINE_SEPARATOR).append(TRACE_PREFIX);
            sbuf.append(Transform.escapeTags(step.toString()));
        }

        if (commonFrames > 0) {
            sbuf.append(CoreConstants.LINE_SEPARATOR).append(TRACE_PREFIX);
            sbuf.append("\t... ").append(commonFrames).append(" common frames omitted").append(CoreConstants.LINE_SEPARATOR);
        }

        sbuf.append(CoreConstants.LINE_SEPARATOR);
    }

    public void renderThrowFirstLine(StringBuilder sb, IThrowableProxy tp) {
        int commonFrames = tp.getCommonFrames();
        if (commonFrames > 0) {
            sb.append(CoreConstants.LINE_SEPARATOR).append("Caused by: ");
        }

        sb.append(tp.getClassName()).append(": ").append(Transform.escapeTags(tp.getMessage()));
    }

    private Converter<ILoggingEvent> getConverter() {
        Converter<ILoggingEvent> converters = null;

        try {
            Parser ex = new Parser(pattern);
            ex.setContext(this.getContext());
            Node t = ex.parse();
            converters = ex.compile(t, PatternLayout.defaultConverterMap);
            ConverterUtil.startConverters(converters);
        } catch (ScanException e) {
            this.addError("Incorrect pattern found", e);
        }

        return converters;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }
}

