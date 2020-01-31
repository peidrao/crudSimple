const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;
const MongoClient = require('mongodb').MongoClient 

const uri = 'mongodb+srv://pedrao:tecnologiamongodb@cluster0-5ftnz.mongodb.net/test?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: true })) // urlencoded informa ao body-parser que é para extarir os dados do elemento do formulário

MongoClient.connect(uri, (err, client) => {
    if(err) {
        return console.log(err);
    }
    //useUnifiedTopology: true
    
    db = client.db('Cluster0')
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`)
    })
})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log('Salvo no banco de dados');
        res.redirect('/')
        db.collection('data').find().toArray((err, results) => {
            console.log(results)
        })
    })
})

app.get('/', (req, res) => {
    let cursor = db.collection('data').find()
})
