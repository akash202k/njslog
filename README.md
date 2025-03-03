# njslog

*A lightweight and easy-to-use logging library for Node.js applications.*

## Installation

Install `njslog` using npm:

```sh
npm install njslog
```

----

## Usage

### Basic Example

```typescript
import { Logger, LogLevel, ConsoleHandler, Formatter } from 'njslog';

// Create a logger
const logger = Logger.getLogger("njslog");
logger.setLevel(LogLevel.DEBUG);

// Create a console handler
const ch = new ConsoleHandler();
ch.setLevel(LogLevel.DEBUG);

// Create a formatter and add it to the handler
const formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
ch.setFormatter(formatter);

// Add the console handler to the logger
logger.addHandler(ch);

// Logging messages
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");
```

---

## API Reference

### Logging Methods

The following methods are available for logging messages at different levels:

| Method | Description |
|--------|------------|
| `logger.debug(message: string, ...args: any[]): void` | Logs a message with [DEBUG] level. |
| `logger.info(message: string, ...args: any[]): void` | Logs a message with [INFO] level. |
| `logger.warning(message: string, ...args: any[]): void` | Logs a message with [WARN] level. |
| `logger.error(message: string, ...args: any[]): void` | Logs a message with [ERROR] level. |
| `logger.critical(message: string, ...args: any[]): void` | Logs a message with [CRITICAL] level. |

> ⚠️ **Note:** Avoid logging sensitive information such as passwords in clear text to ensure security.



---

## License

This project is licensed under the **MIT License**.