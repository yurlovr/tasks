const Task = require('../models/Task');
const User = require('../models/User')

module.exports.getSolution = async function getSolution (ctx, next) {
    const { taskId } = ctx.request.body;
    // валидация
    if (!taskId) return ctx.throw(401, 'Необходимо указать taskId');
    const task = await Task.findById(taskId);

    if (!ctx.user.solutionTasks.some(obj => task._id.equals(obj.task)) && !ctx.user.receivedAnswers.some(obj => task._id.equals(obj.task))) {
        const user = await User.findOne({ email: ctx.user.email });
        user.receivedAnswers = ctx.user.receivedAnswers.concat({ task: task._id, category: task.category, classNumber: task.classNumber });
        await user.save()
        ctx.user = user
    }

    ctx.status = 200;
    ctx.body = { solution: task.solution }
}