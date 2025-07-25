const logger = require('./logger');

class ResponseHandler {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    const response = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };

    logger.info(`Success Response: ${message}`, { statusCode, data: data ? 'present' : 'null' });
    return res.status(statusCode).json(response);
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    };

    logger.error(`Error Response: ${message}`, { statusCode, errors });
    return res.status(statusCode).json(response);
  }

  static validationError(res, errors) {
    return this.error(res, 'Validation failed', 400, errors);
  }

  static notFound(res, resource = 'Resource') {
    return this.error(res, `${resource} not found`, 404);
  }

  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Access forbidden') {
    return this.error(res, message, 403);
  }

  static conflict(res, message = 'Resource already exists') {
    return this.error(res, message, 409);
  }
}

module.exports = ResponseHandler;