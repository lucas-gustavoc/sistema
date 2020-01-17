const express = require('express')
const router = new express.Router()
const Conta = require('../classes/Conta')

router.post('/contas', async (req, res) => {
    const conta = new Conta(req.body)

    try {
        await conta.save()
        res.status(201).send(conta)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/contas', async (req, res) => {
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
        const busca = await Conta.read(query)
        res.send(busca)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/contas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const conta = await Conta.readOne(_id)

        if (!conta) {
            return res.status(404).send()
        }

        res.send(conta)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/contas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const conta = new Conta(req.body)
        await conta.update(_id)
        res.send(conta)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/contas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        await Conta.delete(_id)
        res.send(_id)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router