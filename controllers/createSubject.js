const Class = require('../models/Class');
const Subject = require('../models/Subject');

module.exports.createSubject = async function createSubject (ctx, next) {
  const { classNumber, subject } = ctx.request.body;
 // валидация всех полей
  if (!subject) return ctx.throw(400, 'Не указан пердмет');
  if (!classNumber) return ctx.throw(400, 'Не указан номер класса');
  if (typeof classNumber !== 'string') return ctx.throw(400, 'Номер класса - строка');
  if (typeof subject !== 'string') return ctx.throw(400, 'Название предмета - строка');
  const existSubject = await Subject.findOne({ subject })
  const existClass = await Class.findOne({ classNumber });

  if (!existClass) return ctx.throw(400, 'Такого класса не существует');
  if (existSubject && existClass.subject.some(obj => existSubject._id.equals(obj))) {
    console.log('tut')
    return ctx.throw(400, 'Такой предмет есть в классе')
  }

  if (existSubject && !existClass.subject.some(obj => existSubject._id.equals(obj))) {
      existSubject.classNumber = existSubject.classNumber.concat(existClass._id);
      await existSubject.save();
      existClass.subject = existClass.subject.concat(existSubject._id);
      await existClass.save()
  } else {

    const newSubject = new Subject({
      subject,
      classNumber: existClass._id
    })
    await newSubject.save()

    if (!existClass.subject.some(obj => newSubject._id.equals(obj))) {  
      existClass.subject = existClass.subject.concat(newSubject._id);
      await existClass.save()
    }
  }
 
  ctx.status = 200;
  ctx.body = {
    isError: false,
    message: `Добавлен новый предмет ${subject} для ${existClass.classNumber} класса`
  }
}