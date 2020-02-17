const express = require('express');
const authMiddleware = require('../middlewares/auth')

const Cards = require('../models/cards');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res)=>{
    try {
        const cards = await Cards.find()

        return res.send({cards});

    } catch (err) {
        return res.status(400).send({error: 'Erro carregando cards'});
    }
}); 

router.post('/register_card', async (req, res) => {
    try {
        const { title, type, description, content} = req.body;
        
        const card = await Cards.create({ title, type, description, content});

        return res.send({card});

    } catch (err) {
        return res.status(400).send({error : 'Erro na criação no card'});
        console.log(err);
    }
});

router.put('/:cardId', async (req, res) => {
    try {
        const { title, type, description, content } = req.body;
        
        const card = await Cards.findByIdAndUpdate(req.params.cardId, {
            title,
            type,
            description,
            content,
        },{new: true}); //retorna o card atualizado

        return res.send({card});
        
    } catch (err) {
        return res.status(400).send({error : 'Erro atualizando card'});
        console.log(err);
    }
});

router.delete('/:cardId', async (req, res) => {
    try {
        const card = await Cards.findByIdAndRemove(req.params.cardId);

        return res.send('Card deletado com sucesso');

    } catch (err) {
        return res.status(400).send({error: 'Não foi possivel deletar o card'});
    }
});

module.exports = app => app.use('/cards', router);