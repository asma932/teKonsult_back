const User = require('../Models/user.model');
const Order = require('../Models/order.model');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

async function getOrders(req, res) {
  try {
    Order.find({}, function (err, response) {
      res.send({
        users: response, status: "OK",
      });
    })

  } catch (e) {
    res.send({ error: e, message: 'KO', status: "Failure" });

  }
}


async function getUserOrders(req, res) {
  try {


    const user = await User.findById(req.user._id);

    Order.find({ user_key: user.user_key }, function (err, myOrders) {
      if (err) {
        res.send({ error: err, message: "Error in Fetching orders", status: 'Failure' });

      }
      console.log(user);
      res.json({ status: "OK", data: myOrders });

    });


  } catch (e) {
    res.send({ error: e, message: "Error in Fetching orders", status: 'Failure' });
  }
}

function getQuantityAndTotalPrice(products) {

  let qty = 0;
  let total = 0;
  products.map(item => {
    qty = qty + parseFloat(item.quantity);
    total = total + parseFloat(item.price.replace(",", "."))
  });
  return { qty, total }
}

//addOrder Controller
async function addOrder(req, res, next) {
  const products = req.body.products;
  const total = getQuantityAndTotalPrice(products).total;
  const quantity = getQuantityAndTotalPrice(products).qty;
  const order = new Order({
    status:'1',
    user_key: req.body.user_key,
    visited: false,
    nom: req.body.nom,
    region: req.body.region,
    adresse: req.body.adresse,
    numTel: req.body.numTel,
    prenom: req.body.prenom,
    moyenpaiement: req.body.moyenpaiement,
    livraisonstandard: req.body.livraisonstandard,
    ville: req.body.ville,
    total,
    quantity,
    products,
    $inc: { order_key: 1 },
  });
  console.log("***************** total : ", total);
  console.log("***************** quantity : ", quantity)

  try {
    await order.save()
    res.status(200).json({
      message: 'Order Added!'
      , status: "OK",
      order,
    })

  } catch (err) {
    res.status(400).json({ 'error': err, status: "KO" })
  }
}

module.exports = {
  getOrders,
  addOrder,
  getUserOrders,
};