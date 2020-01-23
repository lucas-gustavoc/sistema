const path = require('path')
const express = require('express')
const routerContatos = require('./routers/RouterContatos')
const routerOrcamentos = require('./routers/RouterOrcamentos')
const routerContas = require('./routers/RouterContas')

// Variáveis principais
const app = express()
const port = 3000
// const port = process.env.PORT || 3000 //production only

// Middleware functions
app.use((req, res, next) => {
    // res.status(503).send('Sorry, we are in maintainance...')
    next()
})

// Caminhos
const publicDirectoryPath = path.join(__dirname, '../public')

// Definindo caminho da pasta estática
app.use(express.static(publicDirectoryPath))

// Outras definições
app.use(express.json())
app.use(routerContatos)
app.use(routerOrcamentos)
app.use(routerContas)

// Iniciando servidor
app.listen(port, () => {
    console.log('Server listening on port ' + port)
})