var express = require('express')
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://faisalshiblu0:Shiblu360@cluster0.suhyktt.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var app = express()

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const collection = client.db("organicdb").collection("products");
    const product = { name: "laptop", price: 1000, quantity: 20 };
    collection.insertOne(product)
        .then(result => console.log('product inserted'));
});

app.listen(3000, () => console.log('listening to http://localhost/3000'))
