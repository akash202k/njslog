
export enum LogLevel {
    DEBUG = 10,
    INFO = 20,
    WARN = 30,
    ERROR = 40,
    CRITICAL = 50
}

// record.leve >= this.level
// debug (10) >= error (40) this not correct condition 
// no log 

export interface LogRecord {
    name: string;
    level: LogLevel;
    levelName: string;
    message: string;
    timestamp: Date;
    args?: any[];
}


export interface IHandler {
    setLevel(level: LogLevel): void;
    setFormatter(formatter: IFormatter): void;
    handle(record: LogRecord): void;
    format(record: LogRecord): string;
}


export interface IFormatter {
    format(record: LogRecord): string;
}

export interface FHOptions {
    filepath: string,
    maxsize: string,

}
