const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert');


// Configurações de Conexão
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'crm'


// Método utilizado para inserir um novo documento
const inserir = (nomeDaColecao, item) => {

    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            // assert.equal(null, error);
            if (error) {
                return reject(error)
            }
        
            const db = client.db(databaseName)
        
            db.collection(nomeDaColecao).insertOne(item).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
        
            client.close()
        })
    })
}

inserir('users', {
    name: 'Maria',
    age: 58
}).then(({ insertedId: novoID }) => {
    console.log('Cadastrado!', novoID)
}).catch(({ message }) => {
    console.log('It went wrong...', message)
})


// Método utilizado para buscar um único documento
const buscarUm = (nomeDaColecao, querySelecao = {}) => {
    const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    let retorno = {}
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










