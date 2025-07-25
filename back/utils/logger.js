const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor() {
    this.level = process.env.LOG_LEVEL || 'INFO';
  }

  log(level, message, meta = {}) {
    if (logLevels[level] <= logLevels[this.level]) {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level,
        message,
        ...meta
      };

      // Console output
      console.log(`[${timestamp}] ${level}: ${message}`, meta);

      // File output
      const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
  }

  error(message, meta = {}) {
    this.log('ERROR', message, meta);
  }

  warn(message, meta = {}) {
    this.log('WARN', message, meta);
  }

  info(message, meta = {}) {
    this.log('INFO', message, meta);
  }

  debug(message, meta = {}) {
    this.log('DEBUG', message, meta);
  }
}

module.exports = new Logger();