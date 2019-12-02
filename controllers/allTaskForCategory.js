const Task = require('../models/Task');

module.exports.allTaskForCategory = async function allTaskForCategory (ctx, next) {
const { categoryId } = ctx.request.body
if (!categoryId) return ctx.throw(400, 'Для получение задач необходимо указать id темы');
console.log(categoryId)
const allTasks = await Task.find({category: categoryId}); 
 ctx.status = 200;
//  const allClassNumber = allClass.map(cl => cl.classNumber)
 ctx.body = { tasks: allTasks };
}