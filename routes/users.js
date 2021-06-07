const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { patchUser, getMe } = require('../controllers/users');

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30)
  })
});

router.get('/me', getMe);
router.patch('/me', validateUserPatch, patchUser);

module.exports = router;
