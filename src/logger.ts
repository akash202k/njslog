import { time, timeStamp } from "console";
import { IHandler, LogLevel, LogRecord } from "./types";


export class Logger {
    private name: string;
    private level: LogLevel;
    private handlers: IHandler[] = [];
    private static loggers: Map<string, Logger> = new Map();

    private constructor(name: string) {
        this.name = name;
        this.level = LogLevel.DEBUG;
    }

    static getLogger(name: string) {
        if (!this.loggers.has(name)) {
            this.loggers.set(name, new Logger(name));
        }
        return this.loggers.get(name);
    }

    setLevel(level: LogLevel): void {
        this.level = level;
    }

    addHandler(handler: IHandler): void {
        this.handlers.push(handler);
    }

    removeHandler(handler: IHandler): void {
        const index = this.handlers.indexOf(handler);
        if (index !== -1) {
            this.handlers.splice(index, 1);
        }
    }

    private log(level: LogLevel, levelName: string, message: string, ...args: any[]): void {
        if (level >= this.level) {
            const record: LogRecord = {
                name: this.name,
                level,
                levelName,
                message,
                timestamp: new Date(),
                args
            };

            for (const handler of this.handlers) {
                handler.handle(record)
            }
        }
    }

    debug(message: string, ...args: any[]): void {
        this.log(LogLevel.DEBUG, 'DEBUG', message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.log(LogLevel.INFO, 'INFO', message, ...args);
    }

    warning(message: string, ...args: any[]): void {
        this.log(LogLevel.WARN, 'WARN', message, ...args);
    }

    error(message: string, ...args: any[]): void {
        this.log(LogLevel.ERROR, 'ERROR', message, ...args);
    }

    critical(message: string, ...args: any[]): void {
        this.log(LogLevel.CRITICAL, 'CRITICAL', message, ...args);
    }

}