const Comment = require('../Models/comment.model');
const User = require('../Models/user.model');


async function getCommentsPerProduct(req, res) {
  var user_id = req.body.user_id;
  var product_reference = req.body.product_reference;
  try {

    Comment.find({}, function (err, comments) {

      const filtredComments = comments.filter(item => item.product_reference === product_reference);
      var commentsList = [];
      // var users = []
      User.find({}, function (err, response) {

        // response.map(item=>users.push(item))
        filtredComments.map(item => {
          const username = response.filter(it => it.key === item.user_id)[0].name;
          const image = response.filter(it => it.key === item.user_id)[0].image;
          var mycomment = new Comment({
            product_reference: item.product_reference,
            user_id: item.user_id,
            comment: item.comment,
            readOnly: item.user_id !== user_id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            author:  username,
            image,
            key: item.user_id,
          });
          commentsList.push(mycomment)
        });
        res.send({
          comments: commentsList, status: "OK",
        });
      });


    });
  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}

async function addComment(req, res) {
  var product_reference = req.body.product_reference;
  var user_id = req.body.user_id;
  var comment = req.body.comment;
  const newComment = new Comment({
    product_reference,
    user_id,
    comment,
    readOnly: false,
    key: user_id,
  });
  try {
    if (comment !== "") {
      await newComment.save();
      res.send({ message: 'Comment added!', status: "OK" });
    } else {
      res.send({ message: 'Cannot add empty comment', status: "KO" });

    }

  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}

async function UpdateCommentToProduct(req, res) {
  var product_reference = req.body.product_reference;
  var user_id = req.body.user_id;
  var comment = req.body.comment;
  var comment_id = req.body.comment_id;

  const newComment = new Comment({
    product_reference,
    user_id,
    comment,
  });
  try {
    Comment.find({}, async function (err, comments) {
      const result = comments.filter(item => item.product_reference === product_reference && item.user_id === user_id && item.comment_id === comment_id);
      if (result.length > 0) {
        await Comment.updateOne(
          { _id: result._id },
          newComment,
        );
      }
      res.send({ message: 'Comment edited!', status: "OK" });
    });
  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}

module.exports = {
  getCommentsPerProduct,
  UpdateCommentToProduct,
  addComment,
};