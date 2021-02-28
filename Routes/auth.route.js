const router = require('express').Router()
const signup = require('../Controller/auth.controller')
const createCategory = require('../Controller/createCategory.controller')
const login = require('../Controller/auth.controller')
const forgetPassword = require('../Controller/auth.controller')
const changePassword = require('../Controller/auth.controller')
const getCurrentUser = require('../Controller/auth.controller')
const { validateUser } = require('../Middleware/validation');
const { loginValidation } = require('../Middleware/loginvalidation');
const auth = require('../Middleware/auth')
//Categories
router.post('/createCategory', createCategory.createCategory)

//User
router.post('/signup', validateUser, signup.signup)
router.post('/login', loginValidation, login.login)
router.get('/user', auth, getCurrentUser.getCurrentUser)
router.post('/forgetPassword', forgetPassword.forgetPassword)
router.post('/changePassword',changePassword.changePassword)
router.get('/logout', async function (req, res) {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: 'Good bye :(', status: "OK" })
    await req.user.save()
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router