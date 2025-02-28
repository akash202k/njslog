import { LogLevel } from "./types";

// Log level values mapped to there names

export const LEVEL_VALUES: Record<number, string> = {
    [LogLevel.NOTSET]: 'NOTSET',
    [LogLevel.DEBUG]: 'DEBUG',
    [LogLevel.INFO]: 'INFO',
    [LogLevel.WARN]: 'WARN',
    [LogLevel.ERROR]: 'ERROR',
    [LogLevel.FATAL]: 'FATAL'
}

export function getLevelName(level: number): string {
    return LEVEL_VALUES[level] || `UNKNOWN_LEVEL_${level}`;
}