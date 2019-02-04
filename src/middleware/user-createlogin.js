
// eslint-disable-next-line no-unused-vars
module.exports = async function (req,res,next) {

  if (req.method == 'POST') {
    let authors =   await res.hook.app.service('users/login').create({
      user: {
        strategy: 'local',
        email: req.body.user.email,
        password: req.body.user.password
      }
    },{
      query: {},
      route: {},
      provider: 'rest',
      headers: req.headers
    });
    res.data.user.token = authors.user.token;
  }
  next();
};
