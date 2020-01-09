module.exports.alreadySolutionTasks = async function alreadySolutionTasks (ctx, next) {
  const { categoryId } = ctx.request.body
  if (!categoryId) return ctx.throw(400, 'Для получение задач необходимо указать id темы');
  let userSolutionTasks = ctx.user.solutionTasks; // массив решенных задач пользователем
  userSolutionTasks = userSolutionTasks.filter(task => task.category.toString() === categoryId) // остался массив решенных задач только данной категории
    .map(i => {
      const { task, category, classNumber } = i
      return ({taskId: task, categoryId: category, classNumber})
    })
  console.log(userSolutionTasks)
  ctx.status = 200;
  ctx.body = { allreadySolutionTasks: userSolutionTasks };
}