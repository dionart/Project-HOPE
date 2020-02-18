const express = require('express');
const authMiddleware = require('../middlewares/auth')

const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware);

//Função para listagem de usuários
router.get('/', async (req, res)=>{
    try {
        const users = await User.find()

        return res.send({users});

    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Erro carregando Usuários'});
    }
}); 

//Função Update de usuários
router.put('/:userId', async (req, res) => {
    try {
        const { name } = req.body;
        
        const users = await User.findByIdAndUpdate({_id: req.params.userId}, {
            name,
        },{new: true}); //retorna o usuário atualizado

        return res.send({users});
        
    } catch (err) {
        return res.status(400).send({error : 'Erro atualizando Usuário'});
        console.log(err);
    }
});

//Função de escolha de imagem de usuários
router.put('/:userId/pic', async (req, res) => {
    try {
        const { pic } = req.body;
        
        const users = await User.findOneAndUpdate({_id: req.params.userId}, { 
            pic
        },{new: true}); //retorna o usúario atualizado

        return res.send({users});
        
    } catch (err) {
        return res.status(400).send({error : 'Erro atualizando foto de Usuário'});
        console.log(err);
    }
});

module.exports = app => app.use('/user', router);