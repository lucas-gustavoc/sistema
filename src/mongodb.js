const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert');


// Configurações de Conexão
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'crm'


// Método utilizado para inserir um novo documento
const inserir = (nomeDaColecao, item) => {
    const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect((error) => {
        // assert.equal(null, error);
        if (error) {
            return console.log('Não foi possível conectar.')
        }
    
        const db = client.db(databaseName)
    
        db.collection(nomeDaColecao).insertOne(item).then((result) => {
            console.log('Inserido com sucesso!')
        }).catch((error) => {
            console.log('Não foi possível inserir registro...')
        })
    
        client.close()
    })
}


// Método utilizado para buscar um único documento
const buscarUm = (nomeDaColecao, querySelecao = {}) => {
    const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect((error) => {
        if (error) {
            return console.log('Não foi possível conectar.')
        }

        const db = client.db(databaseName)

        db.collection(nomeDaColecao).findOne(querySelecao).then((result) => {
            console.log(result.age, 'nice')
        }).catch((error) => {
            console.log('Ocorreu um erro...')
        })

        client.close()
    })
}


buscarUm('users', { name: 'Mateus' })