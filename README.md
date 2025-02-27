# njslog

*A lightweight and easy-to-use logging library for Node.js applications.*

## Installation

Install `njslog` using npm:

```sh
npm install njslog
```

---

## Usage

### Basic Example

```typescript
import logger from 'njslog';

logger.log('This is a log message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.critical('This is a critical message');
```

---

## API Reference

### Logging Methods

| Method | Description |
|--------|-------------|
| `logger.log(message: string): void` | Logs a message with `[LOG]` level. |
| `logger.info(message: string): void` | Logs a message with `[INFO]` level. |
| `logger.warn(message: string): void` | Logs a message with `[WARN]` level. |
| `logger.error(message: string): void` | Logs a message with `[ERROR]` level. |
| `logger.critical(message: string): void` | Logs a message with `[CRITICAL]` level. |

---

## License

This project is licensed under the **MIT License**.

