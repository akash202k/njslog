import { Logger, ConsoleHandler, levels } from '../src';

// Create a new logger
const logger = new Logger(levels.INFO);

// Add console handler
const handler = new ConsoleHandler(levels.INFO);
logger.addHandler(handler);

// Log some messages
logger.debug('This is a debug message');  // Won't be displayed (below level threshold)
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Log with parameters
logger.info('Hello, {0}!', 'world');

// Log with an error
// try {
//     throw new Error('Something went wrong');
// } catch (error) {
//     logger.error('An error occurred', error);
// }

// Or use the default logger that comes pre-configured
import { defaultLogger } from '../src';

defaultLogger.info('Using the default logger');
defaultLogger.warn('No setup required!');
defaultLogger.error('this is an error');
defaultLogger.debug('this is debug message');
defaultLogger.fatal('this is fatal message')