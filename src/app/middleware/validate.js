const { validationResult } = require('express-validator');

module.exports = validations => {
  return async (request, response, next) => {
    await Promise.all(validations.map(validation => validation.run(request)));

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
};
