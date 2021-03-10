const Category = require('../Models/categories.model')
const jwt = require("jsonwebtoken");


//createCategory Controller
async function createCategory(req, res, next) {


    const category = new Category({
        title: req.body.title,
        description: req.body.description,
        $inc: {key: 1}
    })
    try {
        const newCategory = await category.save()
        res.status(200).json({
            newCategory
            , status: "OK"
        })

    } catch (err) {
        res.status(400).json({'error': err, status: "KO"})
    }
}

async function updateCategory(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var key = req.body.key;
    const category = new Category({
        title,
        description,
        key
    });

    try {
        Category.find({}, async function (err, data) {
            const filter = {key};
            const update = {title, description};
            await Category.findOneAndUpdate(
                filter,
                update,
            );
            res.send({category, status: "OK"});
        });

    } catch (e) {
        res.send({message: 'KO', status: "Failure"});
    }
}

async function deleteCategory(req, res) {
    await Category.deleteOne({'key':  req.body.key}).then(function () {
        res.status(200).json({status: "OK", message: 'Category deleted!'})
    }).catch(err => {
        res.status(400).json({status: "Failure", message: err})

    })
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
}