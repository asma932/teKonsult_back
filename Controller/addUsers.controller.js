const jwt = require("jsonwebtoken");

const User = require('../Models/user.model');


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
    var user_key = req.body.user_key;
    var name = req.body.name;
    var role = req.body.role;
    var image = req.body.image;
    var email = req.body.email;
    var password = req.body.password;

    const users = new User({
        user_key,
        name,
        role,
        image,
        email,
        password,
    });

    try {
        User.find({}, async function (err, data) {
            const filter = {user_key};
            const update = {name, role, image, email, password};
            await User.findOneAndUpdate(
                filter,
                update,
            );
            res.send({message: 'Users edited!', users, status: "OK"});
        });

    } catch (e) {
        res.send({message: e, status: "Failure"});
    }}
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