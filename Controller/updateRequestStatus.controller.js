const PublishRequest = require('../Models/publishRequest.model')


//updateRequestStatus Controller
async function updateRequestStatus(req, res, next) {
  var request_keys=req.body.request_keys

  let newvalues = {
    $set: {
      status: req.body.status,
    }
  }
  try {
for(var i=0;i<request_keys.length;i++) {


    await PublishRequest.updateOne(
      { request_key:request_keys[i] },
      newvalues,
    );

  res.status(200).json({
     status: "OK",
  })
}
  } catch (err) {
    res.status(200).json({ 'message': err,status:"Failure" })
  }





}

module.exports = {
  updateRequestStatus,
}