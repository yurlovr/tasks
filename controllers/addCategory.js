const Category = require('../models/Category');
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const ADMIN = require('../const/const');

module.exports.addCategory = async function addCategory (ctx, next) {
 const { classNumber, subjectId, title, description } = ctx.request.body;
 // валидация всех полей для создания задачи
if (!classNumber) return ctx.throw(400,'Не задан класс для темы предмета');
if (!subjectId) return ctx.throw(400,'Не задан предмет');
if (!title) return ctx.throw(400, 'Нет назавния темы');
if (!description) return ctx.throw(400,'Нет описания темы');
// проверить есть ли такая тема 
// если есть проверить есть ли она в данном предмете
// есть ли она в данном классе

const catygory = await Category.findOne({title});
if (catygory) {
    ctx.status = 200;
    ctx.body = {message: 'Такая тема уже существует'}
} else {
    const currentClass = await Class.findOne({ classNumber });
    if (!currentClass) return ctx.throw(400, 'Такого класса нет, создайте сначала класс');
    const currentSubject = await Subject.findById(subjectId);
    if (!currentSubject) return ctx.throw(400, 'Такого предмета нет, создайте сначала предмет');
    const newCategory  = new Category ({
        title,
        description,
        subject: currentSubject._id,
        classNumber: currentClass._id
    })
    await newCategory.save();
    currentSubject.category =  currentSubject.category.concat(newCategory._id);
    await currentSubject.save()
    ctx.status = 200;
    ctx.body = {message: 'Создана новая тема'}
    }
}