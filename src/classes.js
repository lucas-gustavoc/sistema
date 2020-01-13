const { ObjectID } = require('mongodb')
const db = require('./mongodb')

class Contato {
    constructor(dadosContato) {
        if (dadosContato.nome) this.nome = dadosContato.nome
        if (dadosContato.apelidoOuNomeFantasia) this.apelidoOuNomeFantasia = dadosContato.apelidoOuNomeFantasia
        if (dadosContato.tipo) this.tipo = dadosContato.tipo
        if (dadosContato.telefone) this.telefone = dadosContato.telefone
        if (dadosContato.email) this.email = dadosContato.email
        if (dadosContato.cpfOuCnpj) this.cpfOuCnpj = dadosContato.cpfOuCnpj
        if (dadosContato.rgOuIe) this.rgOuIe = dadosContato.rgOuIe
        if (dadosContato.obs) this.obs = dadosContato.obs
        if (dadosContato.endereco) this.endereco = dadosContato.endereco
        if (dadosContato.dataCadastro) this.dataCadastro = dadosContato.dataCadastro
        if (dadosContato.atendidoPor) this.atendidoPor = dadosContato.atendidoPor
    }

    save() {
        return db.inserir('contatos', this)
    }

    update(stringId) {
        return db.atualizarUm('contatos', { $set: this }, { _id: new ObjectID(stringId) })
    }

    static read(query = {}) {
        return db.buscar('contatos', query)
    }

    static delete(stringId) {
        return db.excluirUm('contatos', { _id: new ObjectID(stringId) })
    }

}