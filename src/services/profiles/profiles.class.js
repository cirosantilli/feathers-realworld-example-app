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

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }
}
module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
