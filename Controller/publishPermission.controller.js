const PublishRequest = require('../Models/publishRequest.model');
const Product = require('../Models/product.model');


async function getPublishPermission(req, res) {
  try {
  await  Product.find({ user_key: req.body.user_key }, function (err, products) {

      if (err) {
        res.json({ error: err, message: "Error in Fetching products", status: 'Failure' });

      }
      try {
        PublishRequest.find({ user_key: req.body.user_key }, function (err, requests) {
          if (err) {
            res.json({ error: err, message: "Error in Fetching orders", status: 'Failure' });

          }
          if (requests.length > 0) {
            if (requests[0].status === "AP") {
              res.json({ status: "OK", data: requests, permission: 'AP',products_permetted:requests[0].productsNumber-products.length });
            } else if (requests[0].status === "PR") {
              res.json({ status: "OK", message: 'Demande en cours', permission: 'PR' });
            } else {
              res.json({ status: "OK", message: "Demande rejeter!", permission: 'NO' });
            }

          } else {
            res.json({
              permission: 'KO',
              status: "OK",
              message: "You cannot publish products, please contact the administrator!"
            });
          }


        });


      } catch (e) {
        res.json({ error: e, message: "Error in Fetching orders", status: 'Failure' });
      }
    })}catch(e){
    res.json({ error: e, message: "Error in Fetching orders", status: 'Failure' });
  }
}



module.exports = {
  getPublishPermission,
};