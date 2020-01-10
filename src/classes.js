const { ObjectID } = require('mongodb')
const db = require('./mongodb')

class Contato {
    constructor() {
        this.nome = 'Lucas 2'
        this.apelidoOuNomeFantasia = ''
        this.tipo = { cliente: false, fornecedor: false, colaborador: false }
        this.telefone = []
        this.email = []
        this.cpfOuCnpj = ''
        this.rgOuIe = ''
        this.obs = ''
        this.endereco = [{ 
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cep: '', 
            cidade: '', 
            estado: '', 
            país: 'brasil'
        }]
        this.dataCadastro = new Date()
        // this.atendidoPor = new ObjectID('...')
    }

    save() {
        return db.inserir('contatos', this)
    }
}


// const contato = new Contato()

// contato.save().then((result) => {
//     console.log('cadastrado com sucesso', result.insertedId)
// }).catch((error) => {
//     console.log(error.message)
// })

// db.atualizarUm('contatos', { $push: { 
//     telefone: '44999379479' 
// } }, {
//     _id: new ObjectID('5e188697547f9214081bb8c3')
// }).then(() => {
//     console.log('atualização realizada com sucesso')
// })

db.buscarUm('contatos', { 'endereco.logradouro': 'Rua 28 de Junho' }).then((ctt) => {
    console.log(ctt.nome)
})