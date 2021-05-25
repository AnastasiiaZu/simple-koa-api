const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-parser');
const path = require('path');
const render = require('koa-ejs');

// Using App, Router, http body parser
const app = new Koa();
const router = new Router();
app.use(bodyParser());

//Needs a DB connection here
const things = ['Family', 'Coding', 'Yoga'];

//bringing in the path and the options

render(app, {
    root: path.join(__dirname + '/views'), //where to look for static files
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});


//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

//List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I love:',
        things: things
    });
};

//Show add page 
async function showAdd(ctx) {
    await ctx.render('add');
};

//Add thing function
async function add(ctx) {
    const httpBody = ctx.request.body;
    things.push(httpBody.thing);
    ctx.redirect('/');
};



router.get('/test', (ctx) => (ctx.body = 'Hello test'));











// Router middleware
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000, () => {console.log('Server started on port 3000!');});