const Koa = require('koa');
const uuid = require('uuid/v4');
const Router = require('koa-router');
const handleMongooseValidationError = require('./libs/validationErrors');
const { testController } = require('./controllers/testController');
const { addTask } = require('./controllers/addTask');
const { checkAnswer } = require('./controllers/checkAnswer');
const { getSolution } = require('./controllers/getSolution');
const { nextTask } = require('./controllers/nextTask');
const {login} = require('./controllers/login');
const {register} = require('./controllers/registration');
const Session = require('./models/Session');

const app = new Koa();
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.status) {
        ctx.status = err.status;
        ctx.body = {error: err.message};
      } else {
        console.error(err);
        ctx.status = 500;
        ctx.body = {error: 'Internal server error'};
      }
    }
  });

  app.use((ctx, next) => {
    ctx.login = async function(user) {
      const token = uuid();
      await Session.create({token, user, lastVisit: new Date()});
  
      return token;
    };
  
    return next();
  });

  const router = new Router({prefix: '/api'});
  // Регистрация
  router.post('/register', handleMongooseValidationError, register);
  // Вход
  router.post('/login', login);
  
  router.post('/test', testController);
  // добавление задачи
  router.post('/addTask', addTask);
  // Следующая задача
  router.post('/nextTask', nextTask);
  // Получить решение задачи
  router.post('/solution', getSolution);
  // Проверить ответ задачи
  router.post('/checkAnswer', checkAnswer);

  app.use(router.routes());

  module.exports = app;