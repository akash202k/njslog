// FileHandler.ts
import { Handler } from ".";
import { createWriteStream, mkdirSync, existsSync, statSync, WriteStream } from "fs";
import { dirname } from "path";

export class FileHandler extends Handler {
    private filepath: string;
    private stream: WriteStream | null = null;
    private maxSize: number;
    private backupCount: number;
    private currentSize: number = 0;

    constructor(filepath: string, options: {
        maxSize?: number;     // Max file size in bytes before rotation
        backupCount?: number; // Number of backup files to keep
    } = {}) {
        super();
        this.filepath = filepath;
        this.maxSize = options.maxSize || 10 * 1024 * 1024; // Default 10MB
        this.backupCount = options.backupCount || 5;        // Default 5 backups
        this.initializeStream();
    }

    private initializeStream(): void {
        // Ensure directory exists
        const dir = dirname(this.filepath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        // Check current file size if it exists
        if (existsSync(this.filepath)) {
            const stats = statSync(this.filepath);
            this.currentSize = stats.size;
        }

        // Create write stream
        this.stream = createWriteStream(this.filepath, {
            flags: 'a',       // Append mode
            encoding: 'utf8',
            highWaterMark: 64 * 1024 // 64KB buffer
        });

        // Handle stream errors
        this.stream.on('error', (error) => {
            console.error(`Error writing to log file ${this.filepath}:`, error);
        });
    }

    protected emit(message: string): void {
        if (!this.stream) {
            this.initializeStream();
        }

        // Add newline if not present
        const formattedMessage = message.endsWith('\n') ? message : message + '\n';
        const messageSize = Buffer.byteLength(formattedMessage);

        // Check if rotation needed before writing
        if (this.maxSize > 0 && this.currentSize + messageSize > this.maxSize) {
            this.rotateFiles();
        }

        // Write to stream
        if (this.stream) {
            this.stream.write(formattedMessage);
            this.currentSize += messageSize;
        }
    }

    private rotateFiles(): void {
        // Close current stream
        if (this.stream) {
            this.stream.end();
            this.stream = null;
        }

        // Perform rotation
        if (this.backupCount > 0) {
            // Delete oldest log file if it exists
            const oldestLog = `${this.filepath}.${this.backupCount}`;
            if (existsSync(oldestLog)) {
                try {
                    require('fs').unlinkSync(oldestLog);
                } catch (error) {
                    console.error(`Error deleting log file ${oldestLog}:`, error);
                }
            }

            // Shift existing backup logs
            for (let i = this.backupCount - 1; i >= 0; i--) {
                const source = i === 0 ? this.filepath : `${this.filepath}.${i}`;
                const target = `${this.filepath}.${i + 1}`;

                if (existsSync(source)) {
                    try {
                        require('fs').renameSync(source, target);
                    } catch (error) {
                        console.error(`Error rotating log file ${source} to ${target}:`, error);
                    }
                }
            }
        }

        // Reset size counter and create new file
        this.currentSize = 0;
        this.initializeStream();
    }

    close(): void {
        if (this.stream) {
            this.stream.end();
            this.stream = null;
        }
    }
}