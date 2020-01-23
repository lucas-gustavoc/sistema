const express = require('express')
const router = new express.Router()
const Orcamento = require('../classes/Orcamento')

router.post('/orcamentos', async (req, res) => {
    const orcamento = new Orcamento(req.body)

    try {
        if (orcamento.validate()) {
            await orcamento.save()
            res.status(201).send(orcamento)
        } else {
            res.status(400).send(orcamento.validationMessage)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/orcamentos', async (req, res) => {
    const query = {}
    const qString = req.query

    if (qString.titulo) {
        query.$text = {
            $search: qString.titulo,
            $caseSensitive: false,
            $diacriticSensitive: false
        }
    }
    
    try {
        const busca = await Orcamento.read(query)
        res.send(busca)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/orcamentos/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const orcamento = await Orcamento.readOne(_id)

        if (!orcamento) {
            return res.status(404).send()
        }

        res.send(orcamento)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/orcamentos/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const orcamento = await Orcamento.readOne(_id)

        if (!orcamento) {
            return res.status(404).send()
        }
        
        orcamento.registerUpdates(req.body)

        if (orcamento.validate()) {
            await orcamento.update(_id)
            res.send(orcamento)
        } else {
            res.status(400).send(orcamento.validationMessage)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/orcamentos/:id', async (req, res) => {
    const _id = req.params.id

    try {
        await Orcamento.delete(_id)
        res.send(_id)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router