package com.lardi_trans.http.service.utils;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.Configurator;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.spi.ContextAwareBase;
import ch.qos.logback.core.status.InfoStatus;
import ch.qos.logback.core.status.StatusManager;

/**
 * Created by Andrey on 20.05.2015.
 */
public class LoggerConfigurator extends ContextAwareBase implements Configurator {
    @Override
    public void configure(LoggerContext loggerContext) {
        StatusManager sm = loggerContext.getStatusManager();
        if (sm != null) {
            sm.add(new InfoStatus("Setting up html service default configuration.", loggerContext));
        }

        PatternLayoutEncoder pl = new PatternLayoutEncoder();
        pl.setContext(loggerContext);
        pl.setPattern("%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n");
        pl.start();

        ConsoleAppender<ILoggingEvent> ca = new ConsoleAppender<>();
        ca.setContext(loggerContext);
        ca.setName("STDOUT");
        ca.setEncoder(pl);
        ca.start();

        HtmlAppender ha = new HtmlAppender();
        ha.setContext(loggerContext);
        ha.setReversePrint(true);
        ha.setName("HTML");
        ha.start();

        Logger rootLogger = loggerContext.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.setLevel(Level.DEBUG);

        rootLogger.addAppender(ha);
        rootLogger.addAppender(ca);

        loggerContext.getLogger("com.wordnik.swagger").setLevel(Level.INFO);
    }
}
