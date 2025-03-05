import { log } from "console";
import {
    ConsoleHandler,
    Formatter,
    Logger,
    LogLevel
} from "./index";
import { FileHandler } from "./handlers/file-handler";

// Create a logger instance
const logger = Logger.getLogger("njslog");

// Create a console handler and set log level
const consoleHandler = new ConsoleHandler();
consoleHandler.setLevel(LogLevel.DEBUG);

// Create a formatter and assign it to the console handler
const console_formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
consoleHandler.setFormatter(console_formatter);

// Add the console handler to the logger
logger.addHandler(consoleHandler);

// Create a file handler, set log level, and assign the formatter
const fileHandler = new FileHandler();
fileHandler.setLevel(LogLevel.DEBUG);

// Create a formatter and assign it to the console handler
const file_formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
fileHandler.setFormatter(file_formatter);

// Add the file handler to the logger
logger.addHandler(fileHandler);

// Logging messages at different levels
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");

// Uncomment for debugging project root directory
// const projectRoot = fileHandler.getProjectRootDir();
// console.log(projectRoot);
