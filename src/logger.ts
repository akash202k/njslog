import { IHandler, LogLevel } from './types';
import { LogRecord } from './record';

/**
 * Basic logger with level filtering
 */
export class Logger {
    private level: number;
    private handlers: IHandler[];

    /**
     * Creates a new Logger
     * 
     * @param level The minimum log level
     */
    constructor(level: number = LogLevel.NOTSET) {
        this.level = level;
        this.handlers = [];
    }

    /**
     * Set the logger's minimum level
     * 
     * @param level The minimum log level
     */
    setLevel(level: number): void {
        this.level = level;
    }

    /**
     * Check if a message of the given level would be logged
     * 
     * @param level The log level to check
     * @returns true if the message would be logged
     */
    isEnabledFor(level: number): boolean {
        return level >= this.level;
    }

    /**
     * Add a handler to this logger
     * 
     * @param handler The handler to add
     */
    addHandler(handler: IHandler): void {
        if (!this.handlers.includes(handler)) {
            this.handlers.push(handler);
        }
    }

    /**
     * Remove a handler from this logger
     * 
     * @param handler The handler to remove
     */
    removeHandler(handler: IHandler): void {
        const index = this.handlers.indexOf(handler);
        if (index !== -1) {
            this.handlers.splice(index, 1);
        }
    }

    /**
     * Log a message at DEBUG level
     * 
     * @param message The message to log
     * @param args Optional format arguments
     */
    debug(message: string, ...args: any[]): void {
        this.log(LogLevel.DEBUG, message, ...args);
    }

    /**
     * Log a message at INFO level
     * 
     * @param message The message to log
     * @param args Optional format arguments
     */
    info(message: string, ...args: any[]): void {
        this.log(LogLevel.INFO, message, ...args);
    }

    /**
     * Log a message at WARN level
     * 
     * @param message The message to log
     * @param args Optional format arguments
     */
    warn(message: string, ...args: any[]): void {
        this.log(LogLevel.WARN, message, ...args);
    }

    /**
     * Log a message at ERROR level
     * 
     * @param message The message to log
     * @param args Optional format arguments
     */
    error(message: string, ...args: any[]): void {
        // Extract error if present
        let error: Error | undefined;
        const filteredArgs = [...args].filter(arg => {
            if (arg instanceof Error) {
                error = arg;
                return false;
            }
            return true;
        });

        this.log(LogLevel.ERROR, message, ...filteredArgs, error);
    }

    /**
     * Log a message at FATAL level
     * 
     * @param message The message to log
     * @param args Optional format arguments
     */
    fatal(message: string, ...args: any[]): void {
        // Extract error if present
        let error: Error | undefined;
        const filteredArgs = [...args].filter(arg => {
            if (arg instanceof Error) {
                error = arg;
                return false;
            }
            return true;
        });

        this.log(LogLevel.FATAL, message, ...filteredArgs, error);
    }

    /**
     * Log a message at the specified level
     * 
     * @param level The log level
     * @param message The message to log
     * @param args Optional arguments or error
     */
    private log(level: number, message: string, ...args: any[]): void {
        if (!this.isEnabledFor(level)) {
            return;
        }

        // Extract error if present
        let error: Error | undefined;
        const filteredArgs = args.filter(arg => {
            if (arg instanceof Error) {
                error = arg;
                return false;
            }
            return true;
        });

        // Create record
        const record = new LogRecord(
            message,
            level,
            filteredArgs.length > 0 ? filteredArgs : undefined,
            error
        );

        // Process with all handlers
        for (const handler of this.handlers) {
            handler.handle(record);
        }
    }
}