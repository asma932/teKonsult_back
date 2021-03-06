const Rate = require('../Models/rate.model');

async function getRatesPerProduct(req, res) {
  var product_key = req.body.product_key;
  try {
    Rate.find({}, function (err, rates) {
      var sommeRates1 = 0;
      var sommeRates2 = 0;
      var sommeRates3 = 0;
      var sommeRates4 = 0;
      var sommeRates5 = 0;
      const result = rates.filter(item => item.product_key === product_key);
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
          rates,
        }, status: "OK",
      });
    });
  } catch (e) {
    res.send({ message: 'KO', status: "Failure" });

  }
}

async function getRatePerUserPerProduct(req, res) {
  var product_key = req.body.product_key;
  var user_key = req.body.user_key;
  try {
    Rate.find({}, function (err, rates) {
      var sommeRates = 0;
      const result = rates.filter(item => item.product_key === product_key && item.user_key === user_key);
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
  var product_key = req.body.product_key;
  var user_key = req.body.user_key;
  var rate_value = req.body.rate_value;

  const rate = new Rate({
    product_key,
    user_key,
    rate_value,
    $inc: { rate_key: 1 },
  });
  try {
    Rate.find({}, async function (err, rates) {
      const result = rates.filter(item => item.product_key === product_key && item.user_key === user_key);
      if (result.length === 0) {
        await rate.save()
      } else {



        const filter = { product_key,user_key };
        const update = { rate_value };

        await Rate.updateOne(
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