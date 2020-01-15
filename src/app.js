const path = require('path')
const express = require('express')
const { Contato } = require('./classes')

// Variáveis principais
const app = express()
const port = 3000
// const port = process.env.PORT || 3000 //production only

// Caminhos
const publicDirectoryPath = path.join(__dirname, '../public')

// Definindo caminho da pasta estática
app.use(express.static(publicDirectoryPath))

// Outras definições
app.use(express.json())

// Lidando com solicitações

// CREATE contatos
app.post('/contatos', async (req, res) => {
    const contato = new Contato(req.body)

    try {
        await contato.save()
        res.status(201).send(contato)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// READ contatos
app.get('/contatos', async (req, res) => {
    try {
        const busca = await Contato.read()
        res.send(busca)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// READ um único contato
app.get('/contatos/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const contato = await Contato.readOne(_id)

        if (!contato) {
            return res.status(404).send()
        }

        res.send(contato)
    } catch (error) {
        res.status(500).send()
    }
})


// Iniciando servidor
app.listen(port, () => {
    console.log('Server listening on port ' + port)
})