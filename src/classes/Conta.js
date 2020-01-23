const { ObjectID } = require('mongodb')
const db = require('../db/mongodb')

class Conta {

    constructor(dadosConta) {
        this.titulo = dadosConta.titulo
        this.venda = dadosConta.venda
        this.contato = dadosConta.contato
        this.obs = dadosConta.obs
        this.valorTotal = dadosConta.valorTotal
        this.data = dadosConta.data
        this.formaDePagamento = dadosConta.formaDePagamento
        this.tipo = dadosConta.tipo // 'E' para Entrada e 'S' para Saída
        this.faturas = dadosConta.faturas
    }

    validate() {
        let valid = true

        // titulo. Required
        if (!this.titulo) {
            // Entra aqui se 'titulo' for undefined ou '' (vazio)
            this.validationMessage = 'Campo "título" é obrigatório.'
            valid = false
        }

        return valid
    }

    save() {
        delete this.validationMessage
        return db.inserir('contas', this)
    }

    registerUpdates(updates) {
        const fields = Object.keys(updates)
        fields.forEach((field) => {
            this[field] = updates[field]
        })
        return fields
    }

    update(stringId) {
        return db.atualizarUm('contas', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static async read(query = {}) {
        const busca = await db.buscar('contas', query)
        const resultado = await busca.cursorData.toArray()
        busca.client.close()
        return resultado
    }

    static async readOne(stringId) {
        const dadosCt = await db.buscarUm('contas', { _id: new ObjectID(stringId) })
        if (!dadosCt) return undefined
        return new Conta(dadosCt)
    }

    static delete(stringId) {
        return db.excluirUm('contas', { _id: new ObjectID(stringId) })
    }

}

module.exports = Conta