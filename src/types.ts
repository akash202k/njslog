
export enum LogLevel {
    NOTSET = 0,
    DEBUG = 10,
    INFO = 20,
    WARN = 30,
    ERROR = 40,
    FATAL = 50
}


export interface ILogRecord {
    getFormattedMessage(): unknown;
    message: string;
    level: number;
    levelName: string;
    timestamp: Date;
    args?: any[];
    error?: Error;
    getFormattedMessage(): string;
}


export interface IHandler {
    level: number;
    setLevel(level: number): void;
    handle(record: ILogRecord): void

}