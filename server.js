const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;
const MongoClient = require('mongodb').MongoClient
//pedrao
const uri = 'mongodb+srv://pedrao:tecnologiamongodb@cluster0-5ftnz.mongodb.net/test?retryWrites=true&w=majority'

MongoClient.connect(uri, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db('Cluster0')
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`)
    })
})

app.use(bodyParser.urlencoded({ extended: true })) // urlencoded informa ao body-parser que é para extarir os dados do elemento do formulário
app.use(express.static(__dirname + '/styles'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    let cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) {
            return console.log(err)
        }
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log('Salvo no banco de dados');
        res.redirect('/show')

    })
})

app.route('/edit/:id')
    .get((req, res) => {
        let id = req.params.id
        let ObjectId = require('mongodb').ObjectID

        db.collection('data').find(ObjectId(id)).toArray((err, result) => {
            if (err) {
                return res.send(err)
            }
            res.render('edit.ejs', { data: result })
        })
    }).post((req, res) => {
        let id = req.params.id;
        let nome = req.body.nome;
        let sobrenome = req.body.sobrenome;
        let sexo = req.body.sexo
        let ObjectId = require('mongodb').ObjectID

        db.collection('data').updateOne({ _id: ObjectId(id) }, {
            $set: {
                nome: nome,
                sobrenome: sobrenome,
                sexo: sexo
            }
        }, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/show')
            console.log('Atualizando banco de dados!!')
        })
    })

app.route('/remove/:id')
    .get((req, res) => {
        let id = req.params.id
        let ObjectId = require('mongodb').ObjectID;

        db.collection('data').deleteOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) { return res.send(500, err) }
            console.log('Deletado do Banco de Dados!')
            res.redirect('/show')
        })
    })