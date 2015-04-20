package com.lardi_trans.http.service.utils;

import ch.qos.logback.classic.html.HTMLLayout;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.helpers.CyclicBuffer;
import org.apache.commons.lang3.StringUtils;

import java.util.Collections;
import java.util.List;

/**
 * Created by Andrey on 18.04.2015.
 */
public class HtmlAppender extends AppenderBase<ILoggingEvent> {
    public static final int MAX_RECORDS = 150;
    public static final String DEFAULT_CONVERSION_PATTERN = "%date%level%logger{36}%msg";

    private CyclicBuffer<ILoggingEvent> cb = new CyclicBuffer<>(MAX_RECORDS);
    private String pattern;
    private boolean reversePrint = false;

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
    }

    public void setReversePrint(boolean reversePrint) {
        this.reversePrint = reversePrint;
    }

    public String print() {
        StringBuilder sb = new StringBuilder();
        HTMLLayout layout = new HTMLLayout();
        layout.setPattern(pattern);
        layout.setContext(getContext());
        layout.start();

        sb.append(layout.getFileHeader());
        sb.append(layout.getPresentationHeader());

        List<ILoggingEvent> iLoggingEvents = cb.asList();

        if(reversePrint)
            Collections.reverse(iLoggingEvents);

        for (ILoggingEvent event : iLoggingEvents) {
            sb.append(layout.doLayout(event));
        }
        sb.append(layout.getPresentationFooter());
        sb.append(layout.getFileFooter());

        return sb.toString();
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }
}
