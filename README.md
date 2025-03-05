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
import { FileHandler } from './handlers/file-handler';

// Create a logger
const logger = Logger.getLogger("njslog");

// Create a console handler
const ch = new ConsoleHandler();
ch.setLevel(LogLevel.DEBUG);

// Create a formatter and add it to the handler
const formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
ch.setFormatter(formatter);

// Add the console handler to the logger
logger.addHandler(ch);

// File handler

// Create a file handler, set log level, and assign the formatter
const fileHandler = new FileHandler();
fileHandler.setLevel(LogLevel.DEBUG);

// Create a formatter and assign it to the file handler
const file_formatter = new Formatter("%(timestamp)s - %(name)s - %(levelName)s - %(message)s");
fileHandler.setFormatter(file_formatter);

// Add the file handler to the logger
logger.addHandler(fileHandler);

// Logging messages
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warning("This is a warning message");
logger.error("This is an error message");
logger.critical("This is a critical message");
```

---

## Logging to a File

You can specify a custom file path to store your logs.

- **Default Behavior:**  
  If no file path is provided, logs will be stored at:
  ```
  {your-project-root-dir}/logs/app.log
  ```
  
- **Custom File Path:**  
  If you specify a file path and it **does not exist**, the required directory structure and file will be automatically created.

### Example Usage:
```js
const fileHandler = new FileHandler("path/to/your/logfile.log");
logger.addHandler(fileHandler);
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

