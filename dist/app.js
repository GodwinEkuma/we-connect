'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _business = require('./routes/business');

var _business2 = _interopRequireDefault(_business);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Configure middlewares
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// configure the routes
app.use('/v1', _business2.default);
app.use('/v1', _users2.default);

// Configure the port
var port = process.env.PORT || 6000;
app.listen(port, function () {
  console.log('Server is listening to port ' + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map