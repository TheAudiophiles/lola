# lola

* [lolasound.net](http://lolasound.net) - Try out Lola

This application is still in active development.

Interactive voice-controlled music dashboard for making listening to your favorite music easy, fun, and social

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node and webpack are required to use this application.

To install node/npm with homebrew on Mac OS X:

```
brew update && brew install node
```

Install webpack

```
npm install -g webpack
```

### Installing

Once you have node and npm, install application dependencies.
Make sure you are in the application directory and run:

```
npm install
```

The config files in server/config with example in the name need to each be copied to a file in the same directory
with the same name without the example. Eg. spotify.example.conf.js to spotify.conf.js

After copying all these files you will need to get API keys to place in them. You will need to create an account and get keys
from MusixMatch, Spotify, and Youtube. The session secret key can be any string.

### Run It

To run:

Run webpack in terminal with:
```
./bundle.sh
```

In another tab/window run:

```
npm start
```

### Test

At the moment there are only a few tests written for some of the action creators.

```
npm test
```

## Built With

* [Redux](http://redux.js.org/) - Redux is a predictable state container for JavaScript apps
* [React](https://facebook.github.io/react/) - Front end UI Framework
* [Redux-Saga](https://github.com/redux-saga/redux-saga) - A side effect model for redux apps using ES6 generators and sagas
* [Express](http://expressjs.com/) - NodeJS Web Framework
* [ArtyomJS](https://sdkcarlos.github.io/sites/artyom.html) - Speech Recognition library for creating Siri like apps
* [MongoDB](https://www.mongodb.com/) - Document Database
* [Mongoose](http://mongoosejs.com/) - MongoDB ODM
* [Jest](https://facebook.github.io/jest/) - Javascript testing library from facebook
* [React Media Player](https://github.com/souporserious/react-media-player) Media controls components for React
* [React Burger Menu](https://github.com/negomi/react-burger-menu) Burger menu with cool animations for React
* [Axios](https://github.com/mzabriskie/axios) - Promise based http client

## Authors

* **Daniel Olita** [@danielwolita](https://twitter.com/danielwolita)
* **Rachel DePriest**
* **Nick Barnett**

## License

This project is licensed under the MIT License

## Acknowledgments

* Hat tip to anyone who's code was used
