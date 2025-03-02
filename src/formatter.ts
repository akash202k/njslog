
import { IFormatter, LogRecord } from "./types";


export class Formatter implements IFormatter {
    private format_string: string;
    private levelPadding: number = 8;

    constructor(format_string: string = "%(timestamp)s - %(name)s - %(levelName)s - %(message)s", levelPadding: number = 8) {
        this.format_string = format_string;
        this.levelPadding = levelPadding;
    }

    format(record: LogRecord): string {
        // Pad the level name to a fixed width for alignment
        const paddedLevelName = record.levelName.padEnd(this.levelPadding);

        let result = this.format_string;
        // Use regex with global flag to replace all occurrences
        result = result.replace(/\%\(timestamp\)s/g, record.timestamp.toISOString());
        result = result.replace(/\%\(name\)s/g, record.name);
        result = result.replace(/\%\(levelName\)s/g, paddedLevelName);
        result = result.replace(/\%\(message\)s/g, record.message);
        return result;
    }
}