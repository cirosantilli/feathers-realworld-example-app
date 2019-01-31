/* eslint-disable no-unused-vars */
const helpers = require('../../common/helpers.js');
const ferrors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    let user1 = await helpers.getUserByName(this,data.username);
    if (!user1.data || !user1.data.length) {
      throw new ferrors.NotFound("User not found");
    }
    let user2 = {};
    user2.followingList = [user1.data[0]._id];
    if (params.user.followingList) {
      if (helpers.findIndex(params.user.followingList,user1.data[0]._id) == -1) {
        user2.followingList = params.user.followingList.concat(user2.followingList);
      } else {
        user2.followingList = params.user.followingList;
      }
    }
    await this.app.service('users').patch(params.user._id,user2);
    params.user.followingList = user2.followingList;
    return user1;
  }

  async remove (id, params) {
    let user1 = await helpers.getUserByName(this,params.route.username);
    if (!user1.data || !user1.data.length) {
      throw new ferrors.NotFound("User not found");
    }
    let userlist = params.user.followingList;
    let index = helpers.findIndex(userlist,user1.data[0]._id);
    if (index != -1){
      userlist.splice(index,1);
    }
    let user2 = {};
    user2.followingList = userlist;
    await this.app.service('users').patch(params.user._id,user2);
    params.user.followingList = user2.followingList;
    return user1;
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
