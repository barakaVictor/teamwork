const express = require('express');

const router = express.Router();

const UserController = require('../controllers/usercontroller');

const userController = new UserController();

router.get('/', (request, response) => {
  response.status(200).json({
    message: 'Hello from teamwork!!',
  });
});

router.post('/create-user', userController.createUser);

module.exports = router;
