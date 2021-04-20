const { AuthenticationService, JWTStrategy, authenticate } = require('@feathersjs/authentication');
const authentication = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
      // The GitHub profile image
      avatar: profile.avatar_url,
      // The user email address (if available)
      email: profile.email
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());

  app.use('/users/login', authentication);
  app.configure(expressOauth());
  //app.service('users/login').hooks({
  //  before: {
  //    create: [
  //      authenticate(),
  //    ],
  //  },
  //  after: {
  //    create: [
  //      authenticateResponse(),
  //    ],
  //  },
  //});
  app.service('users/login').hooks({
    before: {
      create: [
        // The frontend does not send 'strategy' as per realworld spec.
        // Feathers expects {email: password: }, but the RealWorld spec
        // sends {user:{email: password:}}
        context => {
          context.data = {
            ...context.data.user,
            strategy: 'local',
          };
          return context;
        },
      ],
    },
    after: {
      create: [
        // Realworld frontend expects {user.token} and FeathersJS
        // produces {accessToken}.
        context => {
          context.result.user.token = context.result.accessToken;
          return context;
        }
      ],
    },
  });
};
