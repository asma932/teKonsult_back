const router = require('express').Router()
const signup = require('../Controller/auth.controller')
const createCategory = require('../Controller/createCategory.controller')
const login = require('../Controller/auth.controller')
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
router.get('/logout', auth, async function (req, res) {
  try {
    res.clearCookie("token");
    console.log("logout OK!")
    res.status(200).send({ message: 'logout OK!', status: "OK" })
    await req.user.save()
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router