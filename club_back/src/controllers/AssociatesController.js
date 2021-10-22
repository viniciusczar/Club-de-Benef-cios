const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const authConfig = require ('../config/auth.json');

const User = require ('../models/User');
const Associates = require ('../models/Associates')
const Owners = require ('../models/Owners');

const salt = bcrypt.genSaltSync(10);

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 14400,
     })
}

module.exports = {

    async searchAssociate(req, res) {
        const { cpf_u } = req.body;
        const { email_u, pass_u, telefone_u } = req.body;
        try {

        const user = await User.findOne({
            where: { id: cpf_u },
            attributes: {
                exclude: ['data_nascimento','password_reset_token', 'password_reset_expires', 'token_access']
            }
        })
        if(user){
            const associates = await Associates.findOne({
                where: { fk_user_id: cpf_u }
            })
            if(associates){
                return res.status(400).send('Unable to register again!')
            }
            else if (!associates){
                const owners = await Owners.findOne({
                    where: { fk_user_id: cpf_u }
                });
                if(owners){
                    if(await bcrypt.compare(pass_u, user.password)){
                        const associates = await Associates.create({
                            fk_user_id: cpf_u
                        })
                        let token = generateToken({ id: cpf_u });
                        user.password = undefined;
                        return res.status(200).send({user, token})
                    }
                    return res.status(400).send('Incorrect Password. Please, try again!')
                }
                const hash = bcrypt.hashSync(pass_u, salt);
                user.password = undefined;
                let token = generateToken({ id: cpf_u });
                const modify = await User.update({
                    email: email_u,
                    password: hash,
                    telefone: telefone_u,
                    token_access: token
                }, {where: { id: cpf_u } })

                const associates = await Associates.create({
                    user_id: cpf_u
                })
                
                // RETIRAR TOKEN ASSIM QUE CRIAR
                return res.status(200).send({user, token});
            
            }
        }
        else {
            user.password = undefined;
            return res.status(401).send('User not found!')
        }
    } catch (err) {
        res.status(401).send('Please try again')
    }
        },

    
}

