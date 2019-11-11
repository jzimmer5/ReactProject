const models = require('../models');
const Money = models.Money;

const makerPage = (req, res) => {
  Money.MoneyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), moneyStacks: docs });
  });
};

const statPage = (req, res) => {
  Money.MoneyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('statistics', { csrfToken: req.csrfToken(), moneyStacks: docs });
  });
};

const makeMoneyAccount = (req, res) => {
  if (!req.body.name || !req.body.amount || !req.body.typeOfAccount) {
    return res.status(400).json({ error: 'Name, amount, and type are all required.' });
  }

  const moneyData = {
    name: req.body.name,
    amount: req.body.amount,
    typeOfAccount: req.body.typeOfAccount,
    interest: req.body.interest,
    owner: req.session.account._id,
  };

  const newMoney = new Money.MoneyModel(moneyData);
  const moneyPromise = newMoney.save();

  moneyPromise.then(() => res.json({ redirect: '/maker' }));
  moneyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Money Account already exists' });
    }
    return res.status(400).json({ error: 'An error occured' });
  });

  return moneyPromise;
};

const getMoney = (request, response) => {
  const req = request;
  const res = response;

  return Money.MoneyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ moneyStacks: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getMoney = getMoney;
module.exports.make = makeMoneyAccount;
module.exports.statPage = statPage;
