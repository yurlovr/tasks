const uuid = require('uuid/v4');
const User = require('../models/User');
// const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  const verificationToken = uuid();
  const {email, displayName, password } = ctx.request.body
  if (!email) ctx.throw(401, 'Для регистрации необходим email');
  if (!displayName) ctx.throw(401, 'Для регистрации необходимо Имя пользователя');
  if (!password) ctx.throw(401, 'Для регистрации необходим password'); 
  const user = new User({
    email: email,
    displayName: displayName,
    verificationToken,
  });

  await user.setPassword(password);
  await user.save();

//   await sendMail({
//     to: user.email,
//     subject: 'Подтвердите почту',
//     locals: {token: verificationToken},
//     template: 'confirmation',
//   });
const token = await ctx.login(user);
  
  ctx.body = {status: 'Пользователь создан', token};
};

// Подтверждение регистрации
// module.exports.confirm = async (ctx, next) => {
//   const user = await User.findOne({
//     verificationToken: ctx.request.body.verificationToken,
//   });

//   if (!user) {
//     ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');
//   }

//   user.verificationToken = undefined;
//   await user.save();

//   const token = uuid();

//   ctx.body = {token};
// };