const Subject = require('../models/Subject');

module.exports.allCategory = async function allCategory (ctx, next) {

 const { classNumber, subjectId, subject } = ctx.request.body;
 if (!classNumber) return ctx.throw(400, 'необходимо указать класс');
 if (!subjectId) return ctx.throw(400, 'необходимо указать Предмет');
 const allCategories = await Subject.findById(subjectId).populate('category');
 const res = allCategories.category.map(cat => {
     return {
         title: cat.title,
         description: cat.description,
         subject,
         id: cat._id,
         classNumber
     }
 })
 if (res.length) {
    ctx.status = 200;
    ctx.body = {thems: res}
 } else {
    ctx.status = 200;
    ctx.body = {message: 'Для данного предмета нет тем'}
 }

}