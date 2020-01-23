const { ObjectID } = require('mongodb')
const validator = require('validator')
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

    validate() {
        let valid = true

        // nome. Required
        if (!this.nome) {
            // Entra aqui se 'nome' for undefined ou '' (vazio)
            this.validationMessage = 'Campo "nome" é obrigatório.'
            valid = false
        }

        return valid
    }

    save() {
        delete this.validationMessage
        return db.inserir('contatos', this)
    }

    registerUpdates(updates) {
        const fields = Object.keys(updates)
        fields.forEach((field) => {
            this[field] = updates[field]
        })
        return fields
    }

    update(stringId) {
        delete this.validationMessage
        return db.atualizarUm('contatos', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static async read(query = {}) {
        const busca = await db.buscar('contatos', query)
        const resultado = await busca.cursorData.toArray()
        busca.client.close()
        return resultado
    }

    static async readOne(stringId) {
        const dadosCtt = await db.buscarUm('contatos', { _id: new ObjectID(stringId) })
        if (!dadosCtt) return undefined
        return new Contato(dadosCtt)
    }

    static delete(stringId) {
        return db.excluirUm('contatos', { _id: new ObjectID(stringId) })
    }

}

module.exports = Contato