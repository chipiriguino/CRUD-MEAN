const express = require('express');
const cors = require('cors');

const dbName = "agregacion_avanzada";
const dbConnection = "mongodb://localhost:27017/"+dbName;

//const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;


let db;
MongoClient.connect(dbConnection, (err, client) => {
    if(err) throw err;
    console.log("BBDD conectada correctamente!!!!");
    db = client.db(dbName);
});

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    console.log("Holaaa estamos en /");
    res.send("Hello world!!!!!!!!!!!");
});
app.post('/', (req, res) => {
    console.log("Entra por post!!");
    console.log(req.body);

    var respuesta = {status: "ok"};
    //res.send(JSON.stringify(respuesta));
    //res.setHeader("Content-Type", "application/json");
    res.json(respuesta);
});

app.get("/listado", (req, res) => {
    db.collection("peliculas")
    .find()
    .toArray()
    .then(result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => console.log(err));

    //res.send("OK");
});

app.get("/findPeliById/:id", (req, res) => {

    var findParams = {_id: new mongo.ObjectId(req.params.id)};

    db.collection("peliculas")
    .findOne(findParams)
    .then(result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => console.log(err));

    //res.send("OK");
});

app.post("/insertPeli", (req, res) => {
    var peli = req.body;
    console.log(peli);
    if(typeof peli !=="undefined") {
        db.collection("peliculas").insertOne(peli).then(data => {console.log(data); res.end();});
    }
});

// put  -> actualizacion (id conocido)
// post -> inserción (id desconocido)

app.put("/updatePeli/:id", (req,res) => {
    var id  = req.params.id;
    console.log(id);
    var peli = req.body;
    delete peli._id;
    console.log(peli);  //{"titulo": "asdfasdf", "generos": ["asdfasf"], "productora": "asdfasdf"}
    var findParams = {_id: new mongo.ObjectId(id)};
    console.log(findParams);

    if (typeof id !="undefined" && typeof peli !=="undefined") {
        db.collection("peliculas").updateOne(findParams, { $set: peli }).then(data => {console.log(data); res.end();});
    }
})

//urlParam
// /deletePeli/9293jsjs9393839
// HTTP delete
app.delete("/deletePeli/:id", (req,res) => {
    var id  = req.params.id; //9293jsjs9393839
    console.log(id);
    if (typeof id !="undefined") {
        var delParams = {_id: new mongo.ObjectId(id)};  //ObjectId(9293jsjs9393839)
        console.log(delParams);

        db.collection("peliculas").deleteOne(delParams).then(data => { console.log(data); res.end();});

    }
    
})

const port = 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto --> '+ port);
})