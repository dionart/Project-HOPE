const jwt = require('jsonwebtoken');
const authConfig = require ('../../config/auth.json');

//Tratamento de token
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!parts.split === 2)
        return res.status(401).send({ error: 'Token error '});

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token unformated'});

    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Invalid Token' });

        req.userId = decoded.id;
        return next();
    })
};