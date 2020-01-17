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

    save() {
        return db.inserir('orcamentos', this)
    }

    update(stringId) {
        return db.atualizarUm('orcamentos', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static async read(query = {}) {
        const busca = await db.buscar('orcamentos', query)
        const resultado = await busca.cursorData.toArray()
        busca.client.close()
        return resultado
    }

    static readOne(stringId) {
        return db.buscarUm('orcamentos', { _id: new ObjectID(stringId) })
    }

    static delete(stringId) {
        return db.excluirUm('orcamentos', { _id: new ObjectID(stringId) })
    }

}

module.exports = Orcamento