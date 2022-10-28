const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const hbs = require('hbs')
const mssql = require('mssql')
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index.routes');
const homeRoutes = require('./routes/home.routes');
const profileRoutes = require('./routes/profile.routes');


const port = 3000;

// create connection to database
const config = {
    server: 'localhost',
    user: 'mamathew',
    password: '1377420',
    database: 'Forum'
};

db = mssql.connect(config,(err) => {
    if (err) {
        throw err;
    }
    console.log('DATABASE CONNECTED');

    mssql.query('USE Forum',function (err, result) {
        if (err) throw err;
        console.log("TABLES CONNECTED");
      });
});

global.db = db;
global.user = {
    acc_id: 0,
    email:'',
    img: 'person.png',
    name:''
};

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use('/assets',express.static(path.join(__dirname, '/public/assets'))); // configure express to use public folder
app.use('/css',express.static(path.join(__dirname, '/public/css'))); // configure express to use public folder
app.use('/img',express.static(path.join(__dirname, '/public/img'))); // configure express to use public folder

app.use(fileUpload()); // configure fileupload


app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/profile', profileRoutes);

app.get('/logout', function(req, res, next){
    global.user.acc_id = 0;
    res.redirect('/');
})

app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});


app.listen(port, () => {
    console.log('SERVER RUNNING ON PORT 3000')
})