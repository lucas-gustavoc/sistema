const path = require('path')
const express = require('express')
const classes = require('./classes')

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
app.post('/contatos', (req, res) => {
    
})


// Iniciando servidor
app.listen(port, () => {
    console.log('Server listening on port ' + port)
})