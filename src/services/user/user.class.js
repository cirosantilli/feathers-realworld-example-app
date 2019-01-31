

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async find (params) {
    let  result = {};
    result.email = params.user.email;
    result.username = params.user.username;
    result.bio = params.user.bio;
    result.image = params.user.image;
    result.token = params.user.token;
    return result;
  }

  async update (id, data, params) {
    // RealWorld
    return this.app.service('users').patch(params.user._id,data.user);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
