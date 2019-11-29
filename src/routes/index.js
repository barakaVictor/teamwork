const express = require('express');

const router = express.Router();
const UserModel = require('../models/user');
const UserController = require('../controllers/usercontroller');
const validate = require('../middleware/validate');

const userValidator = require('../utils/validators/uservalidator')(UserModel);

const userController = new UserController(UserModel);

router.get('/', (request, response) => {
  response.status(200).json({
    message: 'Hello from teamwork!!',
  });
});

router.post('/create-user', userValidator, validate, userController.createUser);

module.exports = router;
