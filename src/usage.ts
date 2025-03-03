import { log } from "console";
import { ConsoleHandler, Formatter, Logger, LogLevel, } from "./index";

// create  logger
const logger = Logger.getLogger("njslog");

// create console handler
const ch = new ConsoleHandler();
ch.setLevel(LogLevel.DEBUG);


// create formatter and add it to the handler
const formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s -  %(message)s")
ch.setFormatter(formatter);

// add the console handler to the logger
logger.addHandler(ch);


// Logging messages
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");