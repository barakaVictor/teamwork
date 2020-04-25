const { body } = require('express-validator');

module.exports = () => {
  return [
    body('title', 'a title is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('title cannot be empty')
      .bail(),
    body('article', 'article body is required')
      .exists().bail()
      .not()
      .isEmpty()
      .withMessage('the article body cannot be empty'),
  ];
};