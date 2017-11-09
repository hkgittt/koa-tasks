const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const dbConfig = require('../app/config/database.js');
const PORT = process.env.PORT || 8081;

const listsRouter = require('./routes/lists.js');

const koa = new Koa();

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url)

koa.use(logger());
koa.use(bodyParser());
koa.use(listsRouter.routes());

const server = koa.listen(PORT).on('error', err => {
  console.error(err);
});
