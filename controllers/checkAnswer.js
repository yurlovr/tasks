const Task = require ('../models/Task');
const User = require('../models/User');

/* Получаем ответ от пользователя,
   Находим задачу в базе
   Сравниваем ответ
   Если неправильный возвращаем 'Неправильный ответ'
   Если ответ правильный:
   Находитм пользователя по переданному токену сессии
   Добавляем id задачи в массив решенных
   Проверяем количество решенных задач, для добавления награды
   Отправляем пользователю 'Правильный ответ' и длинну массива решенных задач (для установки нового прогресса решения)
   Подумать как можно решенные задачи разделить по подкатегориям
*/ 

module.exports.checkAnswer = async function checkAnswer (ctx, next) {
    const { answer, taskId } = ctx.request.body;
    if (!answer) return ctx.throw(401, "Необходимо указать ответ");
    if (!taskId) return ctx.throw(401, "Необходимо указать taskId");
    const task = await Task.findById(taskId);
    if (answer !== task.answer) {
        ctx.status = 200;
        ctx.body = {isError: true, message: 'Неправильный ответ'}
    } 
    if (answer === task.answer) {
        if (!ctx.user.solutionTasks.some(obj => task._id.equals(obj.task))) {
            const user = await User.findOne({ email: ctx.user.email });
            user.solutionTasks = ctx.user.solutionTasks.concat({ task: task._id, category: task.category, classNumber: task.classNumber });
            await user.save()
            ctx.user = user
        }
        ctx.status = 200;
        ctx.body = {isError: false, message: 'Правильный ответ'}
    } 
}