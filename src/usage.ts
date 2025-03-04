import { ConsoleHandler, FileHandler, Formatter, Logger, LogLevel } from "./index";
import * as path from 'path';
import * as fs from 'fs';

// Function to find the root directory of the project
function findRootDir(): string {
    // Start from the current directory
    let currentDir = process.cwd();

    // Look for common root directory indicators
    const rootIndicators = ['package.json', 'node_modules', '.git'];

    // Go up the directory tree until we find indicators or hit the filesystem root
    while (currentDir !== path.parse(currentDir).root) {
        // Check if any root indicators exist in the current directory
        if (rootIndicators.some(indicator => fs.existsSync(path.join(currentDir, indicator)))) {
            return currentDir;
        }

        // Move up one directory
        currentDir = path.dirname(currentDir);
    }

    // If no project root found, fall back to current working directory
    return process.cwd();
}

// Get the root directory and create the logs path
const rootDir = findRootDir();
const logsDir = path.join(rootDir, 'logs');

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create the full path to the log file
const logFilePath = path.join(logsDir, 'app.log');

// Create logger
const logger = Logger.getLogger("njslog");

// Create console handler
const ch = new ConsoleHandler();
ch.setLevel(LogLevel.DEBUG);

// Create file handler with the log file path
const fh = new FileHandler(logFilePath, {
    maxSize: 5 * 1024 * 1024, // 5MB
    backupCount: 3
});
fh.setLevel(LogLevel.CRITICAL); // Maybe set file logging to a higher level than console

// Create formatter and add it to the handlers
const formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
ch.setFormatter(formatter);
fh.setFormatter(formatter);

// Add the handlers to the logger
logger.addHandler(ch);
logger.addHandler(fh);

// Logging messages
logger.debug("This is a debug message"); // Will only appear in console, not in file
logger.info("This is an info message");  // Will appear in both console and file
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");

// Don't forget to close file handlers when your application exits
// This should be handled in your main application shutdown logic
// Example:
// process.on('exit', () => {
//   fh.close();
// });