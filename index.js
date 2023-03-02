var express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://faisalshiblu0:Shiblu360@cluster0.suhyktt.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const collection = client.db("organicdb").collection("products");

    app.get("/products", (req, res) => {
        collection.find({}).toArray((err, documents) => {
            res.send(documents)
        })
    });

    app.post("/addProduct", (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then(result => {
                //console.log('product inserted');
                // res.send('success');
                res.redirect('/');
            });
    });

    app.get("/product/:id", (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) }).toArray((err, documents) => {
            res.send(documents[0]);
        })
    });

    app.delete("/delete/:id", (req, res) => {
        collection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => { res.send(result.deletedCount > 0) })
    });

    app.patch("/update/:id", (req, res) => {
        collection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: { price: req.body.price, quantity: req.body.quantity }
            })
            .then(result => { res.send(result.modifiedCount > 0) })
    })

});

app.listen(3000, () => console.log('listening to http://localhost/3000'))
