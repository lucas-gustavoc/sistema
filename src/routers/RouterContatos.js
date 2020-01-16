const express = require('express')
const router = new express.Router()
const { Contato } = require('../classes/Contato')

// CREATE contatos
router.post('/contatos', async (req, res) => {
    const contato = new Contato(req.body)

    try {
        await contato.save()
        res.status(201).send(contato)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// READ contatos
router.get('/contatos', async (req, res) => {
    try {
        const busca = await Contato.read()
        res.send(busca)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// READ um único contato
router.get('/contatos/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const contato = await Contato.readOne(_id)

        if (!contato) {
            return res.status(404).send()
        }

        res.send(contato)
    } catch (error) {
        res.status(500).send()
    }
})

// UPDATE atualizar um único contato
router.patch('/contatos/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const contato = new Contato(req.body)
        await contato.update(_id)
        res.send(contato)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


// DELETE Excluir registro
router.delete('/contatos/:id', async (req, res) => {
    const _id = req.params.id

    try {
        await Contato.delete(_id)
        res.send(_id)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router