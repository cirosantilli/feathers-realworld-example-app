/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async get (id, params) {

    return  this.app.service('users').find({
      query: {
        username: id
      }
    });

  }
}
module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
