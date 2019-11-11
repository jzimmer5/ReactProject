const controllers = require('./controllers');
const mid = require('./middlewareTest/Index.js');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getMoney', mid.requiresLogin, controllers.Money.getMoney);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Money.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Money.makeMoneyAccount);
  app.get('/stat', mid.requiresLogin, controllers.Money.statPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
