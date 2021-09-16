const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dbconfig = require('./database/db');

//conexión a la BBDD
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, { useNewUrlParser: true }).then(() => {
    console.log("BBDD conexión correcta!!!");
}, error => {
    console.log(error);
});

const peliculasRoute = require('./routes/peliculas.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/peliculas", peliculasRoute);

app.get('/', (req, res) => {
    console.log("Holaaa estamos en /");
    res.send("Hello world!!!!!!!!!!!");
});




const port = 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto --> '+ port);
})