const Koa = require('koa');
const uuid = require('uuid/v4');
const Router = require('koa-router');
const handleMongooseValidationError = require('./libs/validationErrors');
const { testController } = require('./controllers/testController');
const { createClass } = require('./controllers/createClass');
const { createSubject } = require('./controllers/createSubject');
const { addTask } = require('./controllers/addTask');
const { addCategory } = require('./controllers/addCategory');
const { allClass } = require('./controllers/allClass');
const { allSubject } = require('./controllers/allSubject');
const { allCategory } = require('./controllers/allCategory');
const { allTaskForCategory } = require('./controllers/allTaskForCategory');
const { checkAnswer } = require('./controllers/checkAnswer');
const { getSolution } = require('./controllers/getSolution');
const { nextTask } = require('./controllers/nextTask');
const { login } = require('./controllers/login');
const { register } = require('./controllers/registration');
const mustBeAuth = require('./libs/mustBeAuth')
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

  router.use(async (ctx, next) => {
    const token = ctx.request.get('Authorization');
    if (!token) return next();
  
    // const token = header.split(' ')[1];
    // console.log(token)
    // if (!token) return next();
  
    const session = await Session.findOne({token}).populate('user');
    if (!session) {
      ctx.throw(401, 'Неверный аутентификационный токен');
    }
    session.lastVisit = new Date();
    await session.save();
  
    ctx.user = session.user;
    return next();
  });

  router.post('/test', testController);

  // Регистрация
  router.post('/register', handleMongooseValidationError, register);
  // Вход
  router.post('/login', login);

  // Создание класса
  router.post('/createClass', createClass);
  // Создание предмета
  router.post('/createSubject', createSubject);
  // добавление категории (темы)
  router.post('/addCategory', addCategory);
  // добавление задачи
  router.post('/addTask', addTask);
  // Все классы
  router.post('/allClass', mustBeAuth, allClass);
  // все предметы для данного класса
  router.post('/allSubject', mustBeAuth, allSubject);
  // все темы для данного класса и предмета
  router.post('/allCategory',  mustBeAuth, allCategory);
  // все задачи для данного предмета
  router.post('/allTaskForCategory', mustBeAuth, allTaskForCategory);
  // Следующая задача
  router.post('/nextTask', mustBeAuth, nextTask);
  // Получить решение задачи
  router.post('/solution', mustBeAuth, getSolution);
  // Проверить ответ задачи
  router.post('/checkAnswer', mustBeAuth, checkAnswer);

  app.use(router.routes());

  module.exports = app;