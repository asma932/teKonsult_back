const User = require('../Models/user.model')
const Code = require('../Models/codes.model')
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function emailSender(code, emailExist) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    auth: {
      user: 'asmabenbrahim411@gmail.com',
      pass: 'toto123456789',
    },
  });
  await transporter.sendMail({
    from: 'asmabenbrahim411@gmail.com', // sender address
    to: "asmabenbrahim411@gmail.com", // list of receivers
    // to: emailExist, // list of receivers


    subject: "Forget Password?", // Subject line
    html: "<b>Your code is : <span style='color: red'>" + code + "</span></b>", // html body
  });
}


//SignUp Controller
async function signup(req, res, next) {

  const salt = await bycrypt.genSalt(10);
  const hashpassword = await bycrypt.hash(req.body.password, salt)

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    res.status(400).json({ status: 'Failure', "message": 'Email already Exist' })
  }

  const user = new User({
    name: req.body.name,
    role: "guest",
    email: req.body.email,
    password: hashpassword,
  })
  try {
    const userSignup = await user.save()
    const payload = {
      user: {
        id: userSignup.id,
      },
    };
    jwt.sign(payload, "anystring", { expiresIn: 10000 }, function (err, token) {
      if (err) {
        res.send(err)
      }
      res.status(200).json({
        status: "OK",
        message: userSignup.name + " created! ",
      })
    })
  } catch (err) {
    res.status(400).json({ 'error': err, status: "Failure" })
  }
}

//Login Controller
async function login(req, res, next) {
  const emailExist = await User.findOne({ email: req.body.email })
  if (!emailExist) {
    res.status(400).json({ status: 'Failure', message: "Email not Found" })
  }
  const checkpassword = await bycrypt.compare(req.body.password, emailExist.password)
  if (!checkpassword) {
    res.status(400).json({ status: 'Failure', message: "Password mismatch" })
  }
  const token = jwt.sign({ _id: emailExist.id }, 'anystring')
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });

  const user = new User({
    name: emailExist.name,
    email: emailExist.email,
    role: emailExist.role,
  })

  res.header('auth-token', token).json({ token, user, status: "OK" })

  next();

}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user", status: 'Failure' });
  }
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  result = result.trim().toUpperCase().replace(' ', '')
  return result;
}

async function changePassword(req, res) {
  const code = req.body.code;
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const codeExist = await Code.findOne({ email: req.body.email })
  if (codeExist.code === code && codeExist.email === email) {
    const salt = await bycrypt.genSalt(10);
    const hashpassword = await bycrypt.hash(newPassword, salt)
    var newvalues = { $set: { password: hashpassword } };
    await User.updateOne(
      { email: req.body.email },
      newvalues,
    );
    await Code.findOneAndRemove({ email: req.body.email }, function (err) {
      console.log("err", err)
    });
    res.status(200).json({ status: "OK", message: "Password changed!" });
  } else {
    res.status(400).json({ status: "Failure", message: "Password not changed! , please verify your inputs!" });

  }

}

async function forgetPassword(req, res) {
  await Code.remove({ email: req.body.email }, function (err) {
    console.log("err", err)
  });
  const code = randomString(9, req.body.email)
  const generatedCode = new Code({
    code: code,
    email: req.body.email,
  })
  const emailExist = await User.findOne({ email: req.body.email })

  try {
    if (emailExist) {
      await generatedCode.save()
      emailSender(code, emailExist)
    } else {
      res.status(400).json({ "error": 'Email not Exist', status: "Failure" })
    }
  } catch (err) {
    console.log(err)
  }
  if (!emailExist) {
    res.status(400).json({ "error": 'Email not Exist', status: "Failure" })
  } else {
    res.send({ status: "OK", message: " Code sended, please check you email!" })
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
  forgetPassword,
  changePassword,
}