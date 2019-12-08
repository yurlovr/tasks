module.exports.getUserReceivedAnswers = async function getUserReceivedAnswers (ctx, next) {
 ctx.status = 200;
 const result =  ctx.user.receivedAnswers.map(item => {
     const {task, category, classNumber} = item
     return { task, category, classNumber }
 })
 ctx.body = { receivedAnswers: result };
}