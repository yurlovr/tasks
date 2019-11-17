const Task = require('../models/Task');
const User = require('../models/User')

module.exports.getSolution = async function getSolution (ctx, next) {
    const { taskNumber } = ctx.request.body;
    // валидация
    if (!taskNumber) return ctx.throw(401, 'Необходим номер задачи');
    const task = await Task.findOne({ taskNumber });

    if (!ctx.user.solutionTasks.some(obj => task._id.equals(obj.task)) && !ctx.user.receivedAnswers.some(obj => task._id.equals(obj.task))) {
        const user = await User.findOne({ email: ctx.user.email });
        user.receivedAnswers = ctx.user.receivedAnswers.concat({ task: task._id, category: task.category });
        await user.save()
        ctx.user = user

        // это развертка массива receivedAnswers по task И category
        // const test = await User.findOne({email: ctx.user.email}).populate('receivedAnswers.task').populate('receivedAnswers.category');
        // console.log(test)
    }

    ctx.status = 200;
    ctx.body = { solution: task.solution }
}