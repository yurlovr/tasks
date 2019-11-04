const Task = require('../models/Task');

module.exports.getSolution = async function getSolution (ctx, next) {
    const { taskNumber } = ctx.request.body;
    const task = await Task.findOne({taskNumber});
    // валидация
    ctx.status = 200;
    ctx.body = {solution: task.solution}
}