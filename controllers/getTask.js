const Task = require('../models/Task');

module.exports.getTask = async function getTask (ctx, next) {
    const { taskId } = ctx.request.body;
    if (!taskId) return ctx.throw(401, 'Необходимо taskId')
    const task = await Task.findById(taskId);
    if (!task) return ctx.throw(401, 'Задача не найдена')
    ctx.status = 200;
    ctx.body = {isError: false,
        task: {
            title: task.title,
            taskNumber: task.taskNumber,
            task: task.task,
            classNumber: task.classNumber,
            subject: task.subject,
            category: task.category,
            taskId
        }
    }   
}