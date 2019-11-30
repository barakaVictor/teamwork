const router = require('express').Router();

const UserModel = require('../../../../models/user');
const UserController = require('../../../../controllers/usercontroller');
const validate = require('../../../../middleware/validate');

const userValidator = require('../../../../utils/validators/uservalidator')(UserModel);

const userController = new UserController(UserModel);

router.post('/create-user', userValidator, validate, userController.createUser);
router.post('/signin', userController.signin);

module.exports = router;
