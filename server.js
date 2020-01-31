const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;


app.use(bodyParser.urlencoded({ extended: true })) // urlencoded informa ao body-parser que é para extarir os dados do elemento do formulário

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/show', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})