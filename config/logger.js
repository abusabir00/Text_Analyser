const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
