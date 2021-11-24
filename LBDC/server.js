const express = require('express');
const path = require ('path')

let initial_path = path.join(__dirname, "public")


let app = express();
app.use(express.static(initial_path));


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})

app.get('/', function(req, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

// Renvoi une erreur 404 si la route est invalide.
app.use((req, res) => {
    res.json("404");
})


app.listen(3000, ()=> {
    console.log('Ecoute le port 3000........');
})