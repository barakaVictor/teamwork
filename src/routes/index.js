const express = require('express');

const router = express.Router();
const UserModel = require('../models/user');
const UserController = require('../controllers/usercontroller');

const userController = new UserController(UserModel);

router.get('/', (request, response) => {
  response.status(200).json({
    message: 'Hello from teamwork!!',
  });
});

router.post('/create-user', userController.createUser);

module.exports = router;
