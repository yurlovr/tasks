const Task = require('../models/Task');

module.exports.nextTask = async function nextTask (ctx, next) {
    const { taskNumber } = ctx.request.body;
    const task = await Task.findOne({taskNumber});
    if (!task) return ctx.throw(404, 'Задача не найдена')
    ctx.status = 200;
    ctx.body = {isError: false, task: task.task}
}