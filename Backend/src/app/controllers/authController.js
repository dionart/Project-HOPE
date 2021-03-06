const express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const User = require ('../models/user');

const router = express.Router();

//Função para gerar o token de autenticação com o código secret
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn : 86400
    });
}

//Registro de usuário
router.post('/register', async(req, res)=>{
    const {email} = req.body;
    
    try{
        if(await User.findOne({email}))
            return res.status(400).send({error: 'Usuário já existente'});
        
        const user =await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
        
    }catch(err){
        return res.status(400).send({error : 'Falha no registro'})
        
    }
});

//Autenticação de usuário
router.post('/authenticate', async(req, res) =>{
    const {email, password}= req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({error: 'Credenciais incorretas'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Credenciais incorretas'});


    user.password = undefined;

    res.send({
        user, 
        token: generateToken({ id: user.id }),
    });

});

//Função de ''esqueci minha senha''
router.post('/forgot_password', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        
        if(!user)
            return res.status(400).send({error: 'User does not exist'});

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours()+1);
        
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from:'arthurdaao@hotmail.com',
            template:'auth/forgot_password',
            context: { token }
        }, (err) => {
            if(err){
                console.log(err);
                return res.status(400).send({error: 'Error, try again'});
            }
            return res.send();
        })

    } catch (err) {
        console.log(err);
        res.status(400).send({error: 'Try again'});

    }
});

//Função de troca de senha
router.post('/reset_password', async (req,res) => {
    const{email ,token, password} = req.body ;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({error: 'User does not exist'});

        if(token !== user.passwordResetToken)
            return res.status(400).send({error: "Invalid Token"});
        
        const now = new Date();

        if( now> user.passwordResetExpires)
        return res.status(400).send({error: 'Token expired'});

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        return res.status(400).send({error: 'Could not reset password, try again'})
    }

});

//Função para usuário receber permissão de administrador
router.post('/user_admin', async(req, res) =>{
    try {
        const {email, password } = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user)
            return res.status(400).send({error: 'Usuário não encontrado'});

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Senha incorreta'});

        await User.findByIdAndUpdate(user._id, {
            name: user.name,
            email: user.email,
            password: user.password,
            passwordResetToken: user.passwordResetToken,
            passwordResetExpires: user.passwordResetExpires,
            createdAt: user.createdAt,
            isAdmin: true,
            pic: user.pic
        }, { new: true});

        res.send('Usuário agora é um administrador');
    } catch (err) {
        console.log(err)
        return res.status(400).send({error: 'Falha na permissão'});
    }
});

module.exports = app => app.use('/auth', router);