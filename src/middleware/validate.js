const { validationResult } = require('express-validator');

module.exports = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return response.status(422).json({
    status: 'error',
    errors: extractedErrors,
  });
};
