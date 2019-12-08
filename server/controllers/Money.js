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

const graphPage = (req, res) => {
  Money.MoneyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('graph', { csrfToken: req.csrfToken(), moneyStacks: docs });
  });
};

const makeMoneyAccount = (req, res) => {
  if (!req.body.name || !req.body.amount) {
    return res.status(400).json({ error: 'Name, amount are all required.' });
  }
  let interestIncome = 1;
  if (req.body.interest != null) {
    interestIncome = req.body.interest;
  }
  const moneyData = {
    name: req.body.name,
    amount: req.body.amount,
    interest: interestIncome,
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

const updateMoney = (req, res) => {
  const newAmount = {
    name: req.body.name,
    amount: 0,
    interest: 0,
    owner: req.session.account._id,
  }

  newAmount = Money.MoneyModel.findByName(newAmount.name, (err,docs));

  const savePromise = accountLogin.save();
  savePromise.then(() => res.json({username: newAmount.name, amount: newAmount.amount, interest: newAmount.interest, owner: newAmount.owner}));
  savePromise.catch((err) => res.json({ err}));
};

const passChangePage = (req, res) => {
  res.render('moneyChanger', { crsfTOKEN: req.csrfToken() });
};

module.exports.makerPage = makerPage;
module.exports.getMoney = getMoney;
module.exports.make = makeMoneyAccount;
module.exports.statPage = statPage;
module.exports.graphPage = graphPage;
module.exports.updateMoney = updateMoney;
module.exports.updateMoney = updateMoney;
