class Logger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN]: ${message}`);
    }

    error(message: string): void {
        console.error(`[ERROR]: ${message}`);
    }

    info(message: string): void {
        console.log(`[INFO]: ${message}`);
    }

    critical(message: string): void {
        console.error(`[CRITICAL]: ${message}`);
    }
}

// Export an instance of Logger simple
// new mment //
export default new Logger();
