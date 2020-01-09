const Session = require('../models/Session');

module.exports.logOut = async function logOut(ctx, next) {
  const id = ctx.user.id;
  await Session.findOneAndRemove({user: id});
  const session = await Session.findOne({user: id});
  if (session) return ctx.throw(400, 'Что-то пошло не так');
    ctx.status = 200;
    ctx.body = {isError: false, user: "logOut"}
};