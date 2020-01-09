const Class = require('../models/Class');

module.exports.createClass = async function createClass (ctx, next) {
  const { classNumber } = ctx.request.body;
 // валидация всех полей
  if (!classNumber) return ctx.throw(400, 'Не указан номер класса');
  if (typeof classNumber !== 'string') return ctx.throw(400, 'Номер класса - строка');
  const existClass = await Class.findOne({ classNumber })
  if (existClass) return ctx.throw(400, 'Такой класс существует');
       await Class.create({
      classNumber
    })
 
  ctx.status = 200;
  ctx.body = {
    isError: false,
    message: `${classNumber} - класс создан`}
}
