import { log } from "console";
import { Formatter } from "../formatter";
import { LogLevel, IFormatter, LogRecord } from "../types";
import { IHandler } from "../types";


export abstract class Handler implements IHandler {
    private level: LogLevel = LogLevel.DEBUG; // lets keep default level is DEBUG
    private formatter: IFormatter = new Formatter();

    setLevel(level: LogLevel) {
        this.level = level;
    }

    setFormatter(formatter: IFormatter) {
        this.formatter = formatter;
    }

    handle(record: LogRecord) {
        if (record.level >= this.level) {
            const formattedMessage = this.format(record);
            this.emit(formattedMessage);
        }
    }

    format(record: LogRecord) {
        return this.formatter.format(record);
    }

    protected abstract emit(message: string): void;
}



