// Export all public API
export * from './types';
export * from './levels';
export * from './record';
export * from './logger';
export * from './console-handler';

// Export a default logger
import { Logger } from './logger';
import { ConsoleHandler } from './console-handler';
import { LogLevel } from './types';

// Create and export the default logger
const defaultLogger = new Logger(LogLevel.INFO);
const consoleHandler = new ConsoleHandler(LogLevel.INFO);
defaultLogger.addHandler(consoleHandler);

export { defaultLogger };

// Export log levels object for convenience
export const levels = {
    NOTSET: LogLevel.NOTSET,
    DEBUG: LogLevel.DEBUG,
    INFO: LogLevel.INFO,
    WARN: LogLevel.WARN,
    ERROR: LogLevel.ERROR,
    FATAL: LogLevel.FATAL
};