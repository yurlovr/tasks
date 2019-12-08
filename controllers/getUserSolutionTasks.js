const Class = require('../models/Class');

module.exports.getUserSolutionTasks = async function getUserSolutionTasks (ctx, next) {
 ctx.status = 200;
 const result =  ctx.user.solutionTasks.map(item => {
     const {task, category, classNumber } = item
     return { task, category, classNumber }
 })
 ctx.body = { solutionTasks: result };
}