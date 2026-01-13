const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};

const getTimestamp = (): string => {
    return new Date().toISOString();
};

const formatMessage = (level: string, message: string, meta?: any): string => {
    const timestamp = getTimestamp();
    const metaString = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaString}`;
};

export const logger = {
    info: (message: string, meta?: any) => {
        console.log(formatMessage(LOG_LEVELS.INFO, message, meta));
    },

    warn: (message: string, meta?: any) => {
        console.warn(formatMessage(LOG_LEVELS.WARN, message, meta));
    },

    error: (message: string, meta?: any) => {
        console.error(formatMessage(LOG_LEVELS.ERROR, message, meta));
    },

    debug: (message: string, meta?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(formatMessage(LOG_LEVELS.DEBUG, message, meta));
        }
    }
};
