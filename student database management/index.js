const express = require('express');
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

app.get('/', (req, res) => {
    if (req.session.user){
        if (req.session.user === 'admin'){
            res.redirect('/admin')
        } else {
            res.redirect('/profile')
        }
    } else {
        res.render('student/main');
    }
});

// register
const registerRoute = require('./routes/student/register')
app.use('/register', registerRoute)

// login
const loginRoute = require('./routes/student/login')
app.use('/login', loginRoute)

// profile
const profileRoute = require('./routes/student/profile')
app.use('/profile', profileRoute)

// courses
const coursesRoute = require('./routes/student/courses')
app.use('/courses', coursesRoute)

// admin
const adminsRoute = require('./routes/admin/admin')
app.use('/admin', adminsRoute)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})