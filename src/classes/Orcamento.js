const { ObjectID } = require('mongodb')
const db = require('../db/mongodb')

class Orcamento {
    constructor(dadosOrcamento) {
        this.titulo = dadosOrcamento.titulo
        this.contato = dadosOrcamento.contato
        this.vendedor = dadosOrcamento.vendedor
        this.prazoDeEntrega = dadosOrcamento.prazoDeEntrega
        this.condicaoDePagamento = dadosOrcamento.condicaoDePagamento
        this.formaDeEntrega = dadosOrcamento.formaDeEntrega
        this.valorTotal = dadosOrcamento.valorTotal
        this.itens = dadosOrcamento.itens
        this.obs = dadosOrcamento.obs
        this.status = dadosOrcamento.status
        this.dataCadastro = dadosOrcamento.dataCadastro
        this.dataUltimaAlteracao = dadosOrcamento.dataUltimaAlteracao
    }

    validate() {
        let valid = true

        // nome. Required
        if (!this.titulo) {
            // Entra aqui se 'titulo' for undefined ou '' (vazio)
            this.validationMessage = 'Campo "título" é obrigatório.'
            valid = false
        }

        return valid
    }

    save() {
        delete this.validationMessage
        return db.inserir('orcamentos', this)
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
        return db.atualizarUm('orcamentos', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static async read(query = {}) {
        const busca = await db.buscar('orcamentos', query)
        const resultado = await busca.cursorData.toArray()
        busca.client.close()
        return resultado
    }

    static async readOne(stringId) {
        const dadosOtt = await db.buscarUm('orcamentos', { _id: new ObjectID(stringId) })
        if (!dadosOtt) return undefined
        return new Orcamento(dadosOtt)
    }

    static delete(stringId) {
        return db.excluirUm('orcamentos', { _id: new ObjectID(stringId) })
    }

}

module.exports = Orcamento