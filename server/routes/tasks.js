const Router = require('koa-router');
const Tasks = require('../../app/models/tasks.js')

const tasksRouter = new Router({
  prefix: '/tasks',
});

tasksRouter
  .get('/', async (ctx) => {
    const tasks = await Tasks.find({ listId: ctx.params.listId });
    ctx.body = tasks;
  })
  .post('/', async (ctx) => {
    const task = new Tasks({ ...ctx.request.body.task, listId: ctx.params.listId });
    try {
      await task.save()
      ctx.status = 201;
      ctx.body = 'success';
    } catch (err) {
      ctx.throw(422, err.message)
    }
  })
  .put('/:taskId', async (ctx) => {
    try {
      await Tasks.findByIdAndUpdate(ctx.params.taskId, ctx.request.body.task);
      ctx.status = 200;
      ctx.body = 'success';
    } catch (err) {
      ctx.throw(422, err.message)
    }
  })
  .del('/:taskId', async (ctx) => {
    try {
      await Tasks.findByIdAndRemove(ctx.params.taskId);
      ctx.status = 200;
      ctx.body = 'success';
    } catch (err) {
      ctx.throw(422, err.message)
    }
  });

module.exports = tasksRouter;
