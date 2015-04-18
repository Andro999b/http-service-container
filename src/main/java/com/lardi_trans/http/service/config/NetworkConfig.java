package com.lardi_trans.http.service.config;

import org.glassfish.grizzly.http.CompressionConfig;

/**
 * Created by Andrey on 01.04.2015.
 */
public class NetworkConfig {
    private CompressionConfig.CompressionMode compression = CompressionConfig.CompressionMode.FORCE;
    private int transactionTimeout = 30;//send interrupt to worker
    private int workersCoreSize = 4;
    private int workersMaxSize = 200;
    private int workersQueryLimit = -1;

    public CompressionConfig.CompressionMode getCompression() {
        return compression;
    }

    public int getTransactionTimeout() {
        return transactionTimeout;
    }

    public int getWorkersCoreSize() {
        return workersCoreSize;
    }

    public int getWorkersMaxSize() {
        return workersMaxSize;
    }

    public int getWorkersQueryLimit() {
        return workersQueryLimit;
    }
}
