const AdminToken = require('../const/const');

module.exports = function isAdmin(ctx, next) {
  const { admin } = ctx.request.body;
  if (!admin) ctx.throw(400, 'У Вас недостаточно прав');
  if (!AdminToken.admin.some(token => token === admin)) ctx.throw(400, 'У Вас недостаточно прав');

  return next();
};