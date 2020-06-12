'use strict';
const Koa = require('koa');
const passport = require('koa-passport');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const PORT = 3000;
const serve = require('koa-static');
const db = require('./models');

const app = new Koa();
app.use(cors());

const router = require('./router/router');

app.use(bodyParser());

app.use(serve(__dirname + '/dist/'));

app.use(passport.initialize());
app.use(passport.session());
require('./config/jwtStrategy')(passport);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || PORT, () => {
  console.log('Server has been stared');
});

module.exports = app;
