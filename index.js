var express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://faisalshiblu0:Shiblu360@cluster0.suhyktt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var app = express()

app.get('/', function (req, res) {
    res.send('hello world i am working')
})




client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.listen(3000, () => console.log('listening to http://localhost/3000'))
