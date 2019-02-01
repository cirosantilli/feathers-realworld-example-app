# ![RealWorld Example App](logo.png)

> ### Feathers codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with Feathers (and Mongoose) including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the Feathers community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> Describe the general architecture of your app here

# Getting started

To get the Feathers server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Set environment variable MONGODB_FEATHERS_REALWORLD to the connection string for your mongodb instance (You can install a community edition [instructions](https://docs.mongodb.com/manual/installation/#tutorials) or create an instance on mLab: [instructions](https://docs.mlab.com/)).
- `npm start` to start the local server.


# Code Overview

[Feathers](https://feathersjs.com/) is a service oriented REST and Real Time API layer.  Endpoints are defined as services.

## Application Structure

- `app.js` - Entry point for the application.
- `config/` - Configuration/environment variables for the server.
- `src/services/` - Service implementations
- `src/middleware/` - Middleware implementations
- `src/models/` - Schema definitions for our Mongoose models(Easily changed to use other databases).
- `src/hooks/` - Hooks for running code before and after services.  Used for formatting requests and responses correctly.
- `src/common/` - Common helper functions.
