const Task = require('../models/Task');

module.exports.nextTask = async function nextTask (ctx, next) {
    console.log(ctx.request.body)
    const { taskNumber } = ctx.request.body;
    console.log(taskNumber) //1
    const task = await Task.findOne({taskNumber});
    console.log(task) //1
    if (!task) return ctx.throw(404, 'Задача не найдена')
    ctx.status = 200;
    ctx.body = {isError: false, task: task.task}
}