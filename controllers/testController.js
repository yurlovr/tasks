
module.exports.testController = async function testController(ctx, next) {
    ctx.status = 200;
    ctx.body = { message: ctx.request.body.message}
};