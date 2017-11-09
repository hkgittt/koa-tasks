const Router = require('koa-router');
const Lists = require('../../app/models/lists.js')
const tasksRouter = require('./tasks.js');

const listsRouter = new Router({
  prefix: '/lists',
});

listsRouter
  .get('/', async (ctx) => {
    const lists = await Lists.find({});
    ctx.body = lists;
  })
  .post('/', async (ctx) => {
    const list = new Lists(ctx.request.body.list);
    try {
      await list.save()
      ctx.status = 201;
      ctx.body = 'success';
    } catch (err) {
      ctx.throw(422, err.message)
    }
  })
  .get('/:listId', async (ctx) => {
    try {
      const list = await Lists.findOne({ _id: ctx.params.listId });
      ctx.body = list;
    } catch (err) {
      ctx.throw(404, err.message)
    }
  })
  .del('/:listId', async (ctx) => {
    try {
      await Lists.findByIdAndRemove(ctx.params.listId);
      ctx.status = 200;
      ctx.body = 'success';
    } catch (err) {
      ctx.throw(422, err.message)
    }
  });

listsRouter
  .use('/:listId', tasksRouter.routes());

module.exports = listsRouter;
