const { ObjectID } = require('mongodb')
const db = require('../db/mongodb')

class Contato {
    constructor(dadosContato) {
        this.nome = dadosContato.nome
        this.apelidoOuNomeFantasia = dadosContato.apelidoOuNomeFantasia
        this.tipo = dadosContato.tipo
        this.telefone = dadosContato.telefone
        this.email = dadosContato.email
        this.cpfOuCnpj = dadosContato.cpfOuCnpj
        this.rgOuIe = dadosContato.rgOuIe
        this.obs = dadosContato.obs
        this.endereco = dadosContato.endereco
        this.dataCadastro = dadosContato.dataCadastro
        this.atendidoPor = dadosContato.atendidoPor
    }

    save() {
        return db.inserir('contatos', this)
    }

    update(stringId) {
        return db.atualizarUm('contatos', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static async read(query = {}) {
        const busca = await db.buscar('contatos', query)
        const resultado = await busca.cursorData.toArray()
        busca.client.close()
        return resultado
    }

    static readOne(stringId) {
        return db.buscarUm('contatos', { _id: new ObjectID(stringId) })
    }

    static delete(stringId) {
        return db.excluirUm('contatos', { _id: new ObjectID(stringId) })
    }

}

module.exports = Contato