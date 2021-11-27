const express = require('express');
const path = require('path')
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const initial_path = path.join(__dirname, "public")


const app = express();
app.use(express.static(initial_path));


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(initial_path, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(initial_path, 'signup.html'));
});


app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})

// Renvoi une erreur 404 si la route est invalide.
app.get("*", (req, res) => {
    res.json("404 Tu t'es perdu frerot demi-tour !");
})


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                res.send("L'username et/ou le mot de passe est incorrect !");
            }
            res.end();
        });
    } else {
        res.send('Rentrez un username et un mot de passe !');
        res.end();
    }
});



app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log(username, email, password);
    if (username && password && email) {
        connection.query("INSERT INTO `accounts` (`username`, `password`, `email`) VALUES (?, ?, ?)", [username, password, email], function (error, results, fields) {
            res.redirect('/login');
        })

    } else {
        res.send("L'username, l'email et/ou le mot de passe n'est pas conforme !");
    }

});




app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.send('Bienvenue, ' + req.session.username + '!');
    } else {
        res.send("S'il vous plait connectez pour voir cette page !");
    }
    res.end();
});


app.listen(3000, () => {
    console.log('Ecoute le port 3000........');
})