const Task = require('../models/Task');

module.exports.allTaskForCategory = async function allTaskForCategory (ctx, next) {
const { categoryId } = ctx.request.body
if (!categoryId) return ctx.throw(400, 'Для получение задач необходимо указать id темы');
console.log(categoryId)
const allTasks = await Task.find({category: categoryId}); 
const result = allTasks.map(item => {
   const {title, task, taskNumber, classNumber, subject, category } = item
   const taskId = item._id
   return {title, taskNumber, classNumber, subject, category, taskId}
})
 ctx.status = 200;
 ctx.body = { tasks: result };
}