const Class = require('../models/Class');

module.exports.allClass = async function addClass (ctx, next) {

 const allClass = await Class.find(); 
 ctx.status = 200;
 const allClassNumber = allClass.map(cl => {
  const classNumberId = cl._id
  return {
    classNumberId,
    classNumber: cl.classNumber
  }
 })
 ctx.body = { allClass: allClassNumber };
}