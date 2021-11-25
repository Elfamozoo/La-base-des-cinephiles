const express = require('express');
const path = require('path')
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

let initial_path = path.join(__dirname, "public")


let app = express();
app.use(express.static(initial_path));


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

// Renvoi une erreur 404 si la route est invalide.
app.use((req, res) => {
    res.json("404");
})


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/login', (req, res ) => {
    var username = req.body.username;
    var password = req.body.password;
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

app.get('/', function (req, res) {
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