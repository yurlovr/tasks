const Class = require('../models/Class');

module.exports.allSubject = async function allSubject (ctx, next) {

 const { classNumber } = ctx.request.body;
 if (!classNumber) return ctx.throw(400, 'необходимо указать класс');
 const allSubject = await Class.findOne({classNumber}).populate('subject');
 console.log(allSubject)
 const res = allSubject.subject.map(s => {
        return {
        subject: s.subject,
        id: s._id,
        classNumber
    }
});
    if (res.length) {
        ctx.status = 200;
        ctx.body = {allSubject: res}
    } else {
        ctx.status = 200;
        ctx.body = {message: 'Для этого класса еще нет предметов'}
    }
}