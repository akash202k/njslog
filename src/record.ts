import { ILogRecord } from './types';
import { getLevelName } from './levels';

/**
 * Represents a logging event
 */
export class LogRecord implements ILogRecord {
    message: string;
    level: number;
    levelName: string;
    timestamp: Date;
    args?: any[];
    error?: Error;

    /**
     * Creates a new LogRecord instance
     * 
     * @param message The log message
     * @param level The numeric level
     * @param args Optional format arguments
     * @param error Optional error object
     */
    constructor(
        message: string,
        level: number,
        args?: any[],
        error?: Error
    ) {
        this.message = message;
        this.level = level;
        this.levelName = getLevelName(level);
        this.timestamp = new Date();
        this.args = args;
        this.error = error;
    }

    /**
     * Gets formatted message with arguments applied
     */
    getFormattedMessage(): string {
        if (!this.args || this.args.length === 0) {
            return this.message;
        }

        try {
            return this.message.replace(/{(\d+)}/g, (match, number) => {
                return typeof this.args![number] !== 'undefined'
                    ? String(this.args![number])
                    : match;
            });
        } catch (err) {
            return this.message;
        }
    }
}