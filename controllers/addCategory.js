const Category = require('../models/Task');

module.exports.addCategory = async function addCategory (ctx, next) {
 const {title, description } = ctx.request.body;
 // валидация всех полей для создания задачи
if (!title) return ctx.throw(500, 'Нет назавния темы');
if (!description) return ctx.throw(500,'Нет описания темы');
const catygory = await Category.findOne({title});
if (catygory) {
    ctx.status = 200;
    ctx.body = {message: 'Такая тема уже существует'}
} else {
    await Category.create({
        title, description
    })
    ctx.status = 200;
    ctx.body = {message: 'Создана новая тема'}
    }
}