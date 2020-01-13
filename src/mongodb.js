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

// Método utilizado para buscar um único documento
const buscarUm = (nomeDaColecao, querySelecao = {}) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
    
            db.collection(nomeDaColecao).findOne(querySelecao).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
    
            client.close()
        })
    })
}

// Método utilizado para buscar um conjunto de documentos. o Retorno consiste em um cursor e no cliente para ser fechado.
// Mais sobre os operadores de seleção: https://docs.mongodb.com/manual/reference/operator/query/
const buscar = (nomeDaColecao, querySelecao = {}, opcoesDeSelecao = {}) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
    
            try {
                const cursorData = db.collection(nomeDaColecao).find(querySelecao, opcoesDeSelecao)
                resolve({ cursorData, client })
            } catch(error) {
                reject(error)
            }
            
            // client.close()
        })
    })
}

// Método utilizado para contar os documentos de uma seleção
const contar = (nomeDaColecao, querySelecao = {}) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
    
            db.collection(nomeDaColecao).countDocuments(querySelecao).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
            
            client.close()
        })
    })
}

// Método utilizado para atualizar os dados de um ou mais documentos
// Mais sobre os operadores de atualização em: https://docs.mongodb.com/manual/reference/operator/update/
const atualizar = (nomeDaColecao, atualizacoes, querySelecao = {}) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
            
            db.collection(nomeDaColecao).updateMany(querySelecao, atualizacoes).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
            
            client.close()
        })
    })
}


// Método utilizado para atualizar os dados de um único documento
// Mais sobre os operadores de atualização em: https://docs.mongodb.com/manual/reference/operator/update/
const atualizarUm = (nomeDaColecao, atualizacoes, querySelecao = {}) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
            
            db.collection(nomeDaColecao).updateOne(querySelecao, atualizacoes).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
            
            client.close()
        })
    })
}


// Método utilizado para deletar um ou mais documentos do Banco de Dados
const excluir = (nomeDaColecao, querySelecao) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
            
            db.collection(nomeDaColecao).deleteMany(querySelecao).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
            
            client.close()
        })
    })
}


// Método utilizado para deletar apenas um documento do Banco de Dados
const excluirUm = (nomeDaColecao, querySelecao) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect((error) => {
            if (error) {
                return reject(error)
            }
    
            const db = client.db(databaseName)
            
            db.collection(nomeDaColecao).deleteOne(querySelecao).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
            
            client.close()
        })
    })
}

module.exports = {
    inserir,
    buscar,
    buscarUm,
    atualizar,
    atualizarUm,
    excluir,
    excluirUm
}