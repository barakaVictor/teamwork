const { body } = require('express-validator');

module.exports = (userModel) => {
  return [
    body('firstname', 'firstname field is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('firstname field cannot be empty')
      .bail(),
    body('lastname', 'lastname field is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('lastname field cannot be empty'),
    body('email')
      .exists().withMessage('email field is required')
      .not()
      .isEmpty()
      .withMessage('email field cannot be empty')
      .bail()
      .isEmail()
      .withMessage('invalid email provided')
      .bail()
      .custom((val) => userModel.find({ email: val })
        .then((user) => {
          if (user) {
            throw new Error('provided email has been taken');
          }
          return true;
        })),
    body('password', 'password field is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('password field cannot be empty'),
    body('department', 'department field is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('department field cannot be empty'),
  ];
};