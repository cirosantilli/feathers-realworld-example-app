/* eslint-disable no-unused-vars */
const helpers = require('../../common/helpers.js');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    let user1 = await helpers.getUserByName(this,data.username);
    let user2 = {};
    user2.followingList = [user1.data[0]._id];
    if (params.user.followingList) {
      if (helpers.findIndex(params.user.followingList,user1.data[0]._id) == -1) {
        user2.followingList = params.user.followingList.concat(user2.followingList);
      } else {
        user2.followingList = params.user.followingList;
      }
    }
    return this.app.service('users').patch(params.user._id,user2);
  }

  async remove (id, params) {
    let user1 = await helpers.getUserByName(this,params.route.username);
    let userlist = params.user.followingList;
    let index = helpers.findIndex(userlist,user1.data[0]._id);
    if (index != -1){
      userlist.splice(index,1);
    }
    let user2 = {};
    user2.followingList = userlist;
    return this.app.service('users').patch(params.user._id,user2);
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
