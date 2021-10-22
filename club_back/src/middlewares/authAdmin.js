const jwt = require ('jsonwebtoken');
const authConfig = require ('../config/auth.json');
const User = require ('../models/User');

const authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    try{

    if (!authHeader){
        return res.status(401).send({ error: 'No token provided'});
    }
    else {
        const parts = authHeader.split(' ');
        if(!parts.length === 2){
            return res.status(401).send({ error: 'Token error' });
        }
        else {
            const [ scheme, token ] = parts;
            if(!/^Bearer$/i.test(scheme)){
                return res.status(401).send({ error: 'Token malformatted' })
            }
            else {
            const payload = jwt.verify(token, authConfig.secret)
            if (payload.id){
                const atrB = payload.id;
                const advance = await User.findOne({ where: { id: atrB, admin: 'Sim' } });
                if(advance){
                console.log('Next!')
                return next();
                    }
                    return res.status(401).send({ error: 'Token does not belong to user, or nonexistent user.' });
                }
                return res.status(401).send({ error: 'Token does not belong to user, or nonexistent user.' });
            //res.send({ ok: true, user: req.userId });
                }
            }
        }
    }catch(error){
        return res.status(403).send('Please, try again!')
    }
}

module.exports = authMiddleware
