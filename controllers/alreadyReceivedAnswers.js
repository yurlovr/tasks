module.exports.alreadyReceivedAnswers = async function alreadyReceivedAnswers (ctx, next) {
  const { categoryId } = ctx.request.body
  if (!categoryId) return ctx.throw(400, 'Для получение задач необходимо указать id темы');
  let receivedAnswers = ctx.user.receivedAnswers; // массив решенных задач пользователем
  receivedAnswers = receivedAnswers.filter(task => task.category.toString() === categoryId) // остался массив решенных задач только данной категории
    .map(i => {
      const { task, category, classNumber } = i
      return ({taskId: task, categoryId: category, classNumber})
    })
  ctx.status = 200;
  ctx.body = { alreadyReceivedAnswers: receivedAnswers };
}