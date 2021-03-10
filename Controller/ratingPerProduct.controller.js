const Rate = require('../Models/rate.model');

async function getRatesPerProduct(req, res) {
  var product_reference = req.body.product_reference;
  try {
    Rate.find({}, function (err, rates) {
      var sommeRates1 = 0;
      var sommeRates2 = 0;
      var sommeRates3 = 0;
      var sommeRates4 = 0;
      var sommeRates5 = 0;
      const result = rates.filter(item => item.product_reference === product_reference);
      if (result.length === 0) {
      } else {
        result.map(item => {
          switch (item.rate_value) {
            case 1:
              sommeRates1 = result.filter(it => it.rate_value === 1).length;
              break;
            case 2:
              sommeRates2 = result.filter(it => it.rate_value === 2).length;
              break;

            case 3:
              sommeRates3 = result.filter(it => it.rate_value === 3).length;
              break;

            case 4:
              sommeRates4 = result.filter(it => it.rate_value === 4).length;
              break;

            case 5:
              sommeRates5 = result.filter(it => it.rate_value === 5).length;
              break;
          }
        })
      }
      res.send({
        rates: {
          'terrible': sommeRates1,
          'bad': sommeRates2,
          'normal': sommeRates3,
          'good': sommeRates4,
          'wonderful': sommeRates5,
        }, status: "OK",
      });
    });
  } catch (e) {
    res.send({ message: 'KO', status: "Failure" });

  }
}

async function getRatePerUserPerProduct(req, res) {
  var product_reference = req.body.product_reference;
  var user_id = req.body.user_id;
  try {
    Rate.find({}, function (err, rates) {
      var sommeRates = 0;
      const result = rates.filter(item => item.product_reference === product_reference && item.user_id === user_id);
      if (result.length === 0) {
        sommeRates = 0
      } else {
        result.map(item => sommeRates = sommeRates + parseInt(item.rate_value))
      }
      res.send({ result, rate: sommeRates, status: "OK" });
    });
  } catch (e) {
    res.send({ message: 'KO', status: "Failure" });

  }
}

async function addOrUpdateRateToProduct(req, res) {
  var product_reference = req.body.product_reference;
  var user_id = req.body.user_id;
  var rate_value = req.body.rate_value;

  const rate = new Rate({
    product_reference,
    user_id,
    rate_value,
    key:user_id
  });
  try {
    Rate.find({}, async function (err, rates) {
      const result = rates.filter(item => item.product_reference === product_reference && item.user_id === user_id);
      if (result.length === 0) {
        await rate.save()
      } else {
        const filter = { key: user_id };
        const update = { rate_value };
        console.log("******* filter",filter)
        console.log("******* update",update)
        await Rate.findOneAndUpdate(
          filter,
          update,
        );
      }
      res.send({ rate: rate, status: "OK" });
    });
  } catch (e) {
    res.send({ message: 'KO', status: "Failure" });

  }
}

module.exports = {
  getRatesPerProduct,
  getRatePerUserPerProduct,
  addOrUpdateRateToProduct,
};