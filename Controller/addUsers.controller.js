const jwt = require("jsonwebtoken");

const User = require('../Models/user.model');
const bycrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

async function getUsers(req, res) {
    try {
        User.find({}, function (err, response) {
            res.send({
                users: response, status: "OK",
            });
        })

    } catch (e) {
        res.send({error: e, message: 'KO', status: "Failure"});

    }
}

async function editUser(req, res) {
    var newvalues = {}

    var user_key = req.body.user_key;
    var name = req.body.name;
    var role = req.body.role;
    // var image = req.body.image;
    var email = req.body.email;
    const salt = await bycrypt.genSalt(10);
    const password = await bycrypt.hash(req.body.password, salt)

    if (req.body.image !== '') {
        var img = fs.readFileSync(req.body.image);
        var encode_image = img.toString('base64');
        var finalImg = {
            contentType: "image/png",
            image: Buffer.from(encode_image, 'base64'),
        };
        newvalues = {
            $set: {
                image: finalImg,
                user_key,
                name,
                role,
                email,
                password,
            },
        };
    } else {
        newvalues = {
            $set: {
                user_key,
                name,
                role,
                email,
                password,
            },
        };
    }

    try {

        await User.updateOne(
          { user_key },
          newvalues,
        );

            res.send({message: 'Users edited!', users:newvalues, status: "OK"});

    } catch (e) {
        res.send({message: e, status: "Failure"});
    }
}
    async function deleteUser (req, res) {
        await User.deleteOne({'user_key': req.body.user_key}).then(function () {
            res.status(200).json({status: "OK", message: 'User deleted!'})
        }).catch(err => {
            res.status(400).json({status: "Failure", message: err})

        })


    }


module.exports = {
    editUser,
    getUsers,
    deleteUser,

}