const uuid = require('uuid/v4');
const User = require('../models/User');
// const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  const verificationToken = uuid();
  const {email, displayName, password, classNumber } = ctx.request.body
  if (!email) ctx.throw(401, 'Для регистрации необходим email');
  if (!displayName) ctx.throw(401, 'Для регистрации необходимо Имя пользователя');
  if (!password) ctx.throw(401, 'Для регистрации необходим password');
  if (!classNumber) ctx.throw(401, 'Для регистрации необходим номер класса'); 
  const user = new User({
    email,
    displayName,
    classNumber,
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
console.log(user);
  
  ctx.body = {
    status: 'Пользователь создан', 
    token,
    user: {
      displayName: user.displayName,
      email: user.email,
      classNumber: user.classNumber
    }
  };
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