const Comment = require('../Models/comment.model');
const User = require('../Models/user.model');


async function getCommentsPerProduct(req, res) {
  var user_key = req.body.user_key;
  var product_key = req.body.product_key;
  try {

    Comment.find({}, function (err, comments) {

      const filtredComments = comments.filter(item => item.product_key === product_key);
      if (filtredComments.length > 0) {
        var commentsList = [];
        // var users = []
        User.find({}, function (err, response) {

          // response.map(item=>users.push(item))
          filtredComments.map(item => {
            const user = response.filter(it => it.user_key === item.user_key);
            var image = ''
            var username = ''
            if (user.length !== 0) {
              image = user[0].image || ''
              username = user[0].name || ''
            }
            console.log("********************", username)
            console.log("********************", image)
            var mycomment = new Comment({
              product_key: item.product_key,
              user_key: item.user_key,
              comment: item.comment,
              readOnly: item.user_key !== user_key,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              author: username,
              image: image === {} ? '' : image,
              $inc: { comment_key: 1 },
            });
            commentsList.push(mycomment)
          });
          res.send({
            comments: commentsList, status: "OK",
          });
        });
      } else {
        res.send({
          comments: [], status: "OK",
        });
      }


    });
  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}

async function addComment(req, res) {
  var product_key = req.body.product_key;
  var user_key = req.body.user_key;
  var comment = req.body.comment;
  const newComment = new Comment({
    product_key,
    user_key,
    comment,
    readOnly: false,
    $inc: { comment_key: 1 },
  });
  try {
    if (comment !== "") {
      await newComment.save();
      res.send({ newComment, message: 'Comment added!', status: "OK" });
    } else {
      res.send({ message: 'Cannot add empty comment', status: "KO" });

    }

  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}

async function UpdateCommentToProduct(req, res) {
  var product_key = req.body.product_key;
  var user_key = req.body.user_key;
  var comment = req.body.comment;
  var comment_key = req.body.comment_key;

  const newComment = new Comment({
    comment_key,
    product_key,
    user_key,
    comment,
  });
  try {
    Comment.find({}, async function (err, comments) {
      const result = comments.filter(item => item.product_key === product_key && item.user_key === user_key && item.comment_key === comment_key);
      if (result.length > 0) {
        const filter = { comment_key: comment_key };
        const update = { newComment };

        await Comment.findOneAndUpdate(
          filter,
          update,
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