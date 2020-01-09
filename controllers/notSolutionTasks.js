const Task = require('../models/Task');
const User = require('../models/User');

module.exports.notSolutionTasks = async function notSolutionTasks (ctx, next) {
  const { categoryId } = ctx.request.body
  if (!categoryId) return ctx.throw(400, 'Для получение задач необходимо указать id темы');
  const allTasks = await Task.find({category: categoryId});  // массив все задачи данной темы
  let userSolutionTasks = ctx.user.solutionTasks; // массив решенных задач пользователем
  userSolutionTasks = userSolutionTasks.filter(task => task.category.toString() === categoryId); // остался массив решенных задач только данной категории
  const result = allTasks.map(task => {
    if (userSolutionTasks.some(item => item.task.toString() === task._id.toString() )){
      return null
    } else {
      return task
    }})
    .filter(i => i)
    .map(i => {
      const {title, task, taskNumber, classNumber, subject, category } = i;
      const taskId = i._id
      return {title, taskNumber, classNumber, subject, category, taskId, task};
    });
  ctx.status = 200;
  ctx.body = { notSolutionTasks: result };
}