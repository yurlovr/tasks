module.exports.getUserAwards = async function getUserAwards (ctx, next) {
 ctx.status = 200;
 ctx.body = { awards: ctx.user.awards };
}