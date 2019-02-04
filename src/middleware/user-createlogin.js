const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = async function (req,res,next) {

  let authors =   await res.hook.app.service('users/login').create({
    user: {
      strategy: 'local',
      username: req.body.user.username,
      email: req.body.user.email,
      password: req.body.user.password
    }
  },{
    query: {},
    route: {},
    provider: 'rest',
    headers: req.headers
  });
  console.log(res);
  res.data.user.token = authors.user.token;
  next();
};
