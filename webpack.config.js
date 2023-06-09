let env = process.env.NODE_ENV
console.log(env)
switch(env){
  case 'development':
    module.exports = require('./config/webpack.config.dev.js');
    break;
  case 'production':
  case 'analyz':
    module.exports = require('./config/webpack.config.prod.js');
  break;
  case 'multiDevelopment':
    module.exports = require('./config/webpack.config.prod.js');
  break;
  default:

    module.exports = require('./config/webpack.config.prod.js');
}