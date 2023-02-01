const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://angeltest:angeltest@cluster0.h6ea2v9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function insert(data) {
    client.connect(err => {
        const collection = client.db("test").collection("resultados");
        collection.insertOne(data, function (err, result) {
            if (err) throw err;
            client.close();
            console.log(result);
        });
    });
}

app.get("/resultados", (req, res) => {
    console.log("init")
    client.connect(err => {
        const collection = client.db("test").collection("resultados");
        collection.find({}).toArray(function (err, result) {
            if (err) throw err;
            client.close();
            console.log(result);
            res.send({ result });
        });
    });
});


app.post('/suma', (req, res) => {
    console.log(req.body);
    const result = req.body.value1 + req.body.value2
    const data = {
        "value1": req.body.value1,
        "value2": req.body.value2,
        "resultado": result,
        "operacion": "suma",
    }
    insert(data);
    res.send({ result });
});

app.post('/resta', (req, res) => {
    console.log(req.body);
    const result = req.body.value1 - req.body.value2
    const data = {
        "value1": req.body.value1,
        "value2": req.body.value2,
        "resultado": result,
        "operacion": "resta",
    }
    insert(data);
    res.send({ result });
});

app.post('/multiplicacion', (req, res) => {
    console.log(req.body);
    const result = req.body.value1 * req.body.value2
    const data = {
        "value1": req.body.value1,
        "value2": req.body.value2,
        "resultado": result,
        "operacion": "multiplicacion",
    }
    insert(data);
    res.send({ result });
});

app.post('/division', (req, res) => {
    console.log(req.body);
    const result = req.body.value1 / req.body.value2
    const data = {
        "value1": req.body.value1,
        "value2": req.body.value2,
        "resultado": result,
        "operacion": "division",
    }
    insert(data);
    res.send({ result });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});