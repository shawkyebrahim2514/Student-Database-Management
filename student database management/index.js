const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

session = require('express-session');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 6000000
    }
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

app.get('/', (req, res) => {
    if (req.session.updatedData)
        return res.redirect('/profile');
    res.render('main');
});

// register
const registerRoute = require('./routes/register')
app.use('/register', registerRoute)

// login
const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

// profile
const profileRoute = require('./routes/profile')
app.use('/profile', profileRoute)

// courses
const coursesRoute = require('./routes/courses')
app.use('/courses', coursesRoute)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})