const Task = require('../models/Task');
const Category = require('../models/Category');
const Class = require('../models/Class');

module.exports.addTask = async function addTask (ctx, next) {
 const {title, task, solution, answer, classNumber, category} = ctx.request.body;
 // валидация всех полей для создания задачи
 if (!title) return ctx.throw(400, 'У задачи должен быть заголовок');
 if (!task) return ctx.throw(400, 'У задачи должно быть условие');
 if (!solution) return ctx.throw(400, 'У задачи должно быть развернутое решение');
 if (!answer) return ctx.throw(400, 'У задачи должен быть ответ');
 if (!classNumber) return ctx.throw(400, 'Не указан класс, для которого создается задача');
 if (!category) return ctx.throw(400, 'Необходимо указать тему задачи');


 const currentClass = await Class.findOne({ classNumber })
 if (!currentClass)  return ctx.throw(400, 'Данного класса нет, создайте сначала класс')
 const categoryTask = await Category.findOne({title: category});
 if (!categoryTask)  return ctx.throw(400, 'Данного предмета нет, создайте сначала предмет')
 console.log(categoryTask)
 const taskNumber = await Task.estimatedDocumentCount();
 await Task.create({
    title,
    task,
    solution,
    taskNumber: taskNumber + 1,
    answer,
    classNumber: currentClass._id,
    category: categoryTask._id
 })
 
 ctx.status = 200;
 ctx.body = {message: 'Создана новая задача'}
}