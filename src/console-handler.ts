import { IHandler, ILogRecord, LogLevel } from './types';

/**
 * Handler that outputs log records to the console
 */
export class ConsoleHandler implements IHandler {
    level: number;
    private useColors: boolean;

    /**
     * Creates a new ConsoleHandler
     * 
     * @param level Minimum log level to process
     * @param useColors Whether to colorize output
     */
    constructor(
        level: number = LogLevel.NOTSET,
        useColors: boolean = true
    ) {
        this.level = level;
        this.useColors = useColors;
    }

    /**
     * Sets the handler's minimum log level
     * 
     * @param level The log level
     */
    setLevel(level: number): void {
        this.level = level;
    }

    /**
     * Handles a log record if it meets the level threshold
     * 
     * @param record The log record to handle
     */
    handle(record: ILogRecord): void {
        if (record.level >= this.level) {
            this.emit(record);
        }
    }

    /**
     * Emit a log record to the console
     * 
     * @param record The log record to emit
     */
    private emit(record: ILogRecord): void {
        try {
            const formattedMessage = this.format(record);

            if (this.useColors) {
                const coloredMessage = this.colorize(formattedMessage, record.level);
                console.log(coloredMessage);
            } else {
                console.log(formattedMessage);
            }
        } catch (error) {
            console.error('Error in log handler:', error);
        }
    }

    /**
     * Format a record for output
     * 
     * @param record The record to format
     * @returns Formatted string
     */
    private format(record: ILogRecord): string {
        const timestamp = record.timestamp.toISOString();
        const formattedMessage = record.getFormattedMessage
            ? record.getFormattedMessage()
            : record.message;

        let output = `[${timestamp}] ${record.levelName}: ${formattedMessage}`;

        // Add error information if present
        if (record.error) {
            output += `\n${record.error.stack || record.error.toString()}`;
        }

        return output;
    }

    /**
     * Colorizes the message based on log level
     * 
     * @param message The message to colorize
     * @param level The log level
     * @returns Colorized message
     */
    private colorize(message: string, level: number): string {
        // ANSI color codes
        const colors = {
            reset: '\x1b[0m',
            debug: '\x1b[36m', // Cyan
            info: '\x1b[32m',  // Green
            warn: '\x1b[33m',  // Yellow
            error: '\x1b[31m', // Red
            fatal: '\x1b[35m'  // Magenta
        };

        let color: string;

        switch (level) {
            case LogLevel.DEBUG:
                color = colors.debug;
                break;
            case LogLevel.INFO:
                color = colors.info;
                break;
            case LogLevel.WARN:
                color = colors.warn;
                break;
            case LogLevel.ERROR:
                color = colors.error;
                break;
            case LogLevel.FATAL:
                color = colors.fatal;
                break;
            default:
                color = '';
        }

        return `${color}${message}${colors.reset}`;
    }
}