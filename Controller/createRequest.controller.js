const PublishRequest = require('../Models/publishRequest.model');
const User = require('../Models/user.model');

//createRequest Controller
async function createRequest(req, res, next) {



  User.find({}, async function (err, requests) {
    const result1 = requests.filter(item =>  item.user_key === req.body.user_key );
    if (result1.length > 0) {
      PublishRequest.find({}, async function (err, requests) {
        const result = requests.filter(item =>  item.user_key === req.body.user_key );
        if (result.length > 0) {
          res.send({ message: 'request exists!', status: "Failure" });
        }else {

          const request = new PublishRequest({
            status: "PR",
            name: result1[0].name,
            email: result1[0].email,
            user_key: req.body.user_key,
            productsNumber: req.body.productsNumber,
            $inc: { request_key: 1 },
          });
          try {
            const newPublishRequest = await request.save();
            res.status(200).json({
              message: "request created!", status: "OK",
            })

          } catch (err) {
            res.status(400).json({ message: err, status: "Failure" })
          }
        }
      });

    }

  });
}
async function getRequests(req, res) {
  try {
    PublishRequest.find({}, function (err, response) {
      res.send({
        requests: response, status: "OK",
      });
    })

  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}


module.exports = {
  createRequest,
  getRequests
};