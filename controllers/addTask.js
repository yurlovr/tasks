const Task = require('../models/Task');

module.exports.addTask = async function addTask (ctx, next) {
 const {title, task, solution, taskNumber, answer, classNumber} = ctx.request.body;
 // валидация всех полей для создания задачи

 await Task.create({
    title, task, solution, taskNumber, answer, classNumber
 })
 ctx.status = 200;
 ctx.body = {message: 'Task was created'}
}