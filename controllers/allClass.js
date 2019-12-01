const Class = require('../models/Class');

module.exports.allClass = async function addClass (ctx, next) {

 const allClass = await Class.find(); 
 ctx.status = 200;
 const allClassNumber = allClass.map(cl => cl.classNumber)
 ctx.body = { allClass: allClassNumber };
}