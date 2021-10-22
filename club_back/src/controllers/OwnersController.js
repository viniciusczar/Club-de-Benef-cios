const User = require ('../models/User');
const bcrypt = require ('bcrypt');
const Associates = require ('../models/Associates')
const Owners = require ('../models/Owners');

const jwt = require ('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const authConfig = require ('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 14400,
     })
}

module.exports = {

    async searchOwner(req, res) {

        const { cpf_u } = req.body;
        const { cnpj_u, pass_u, telefone_u, email_u } = req.body;
        console.log(req.body);
        try{
            const user = await User.findOne({
                where: { id: cpf_u },
                attributes: {
                    exclude: ['data_nascimento','password_reset_token', 'password_reset_expires', 'token_access']
                }
            })
            const associate = await Associates.findOne({
                where: { fk_user_id: cpf_u }
            })
            const salesman = await Owners.findOne({
                where: { fk_user_id: cpf_u }
            })
            if(user && salesman){
                user.password = undefined;
                return res.status(400).send('Unable to register again!')
            }
            else if(user && associate && !salesman) {
                if(await bcrypt.compare(pass_u, user.password)){
                const modify = await User.update({
                    cnpj: cnpj_u
                }, {where: { id: cpf_u }
                })
                const solicited = await Owners.create({
                    fk_user_id: cpf_u
                })
                user.password = undefined;
                let token = generateToken({ id: user.id });
                return res.status(200).send({user, token});
            }
                return res.status(400).send('Incorrect Password. Please, try again!');
            }
            else if (user && !associate && !salesman) {
                const hash = bcrypt.hashSync(pass_u, salt)
                let token = generateToken({ id: user.id });
                const solicited = await User.update({
                    cnpj: cnpj_u,
                    email: email_u,
                    password: hash,
                    telefone: telefone_u
                }, { where: { id: cpf_u } },
                )
                const addition = await Owners.create({
                    fk_user_id: cpf_u
                })
                user.password = undefined;
                return res.status(200).send({user, token});
            }
            else {
                return res.status(400).send('Please check the data and try again.');
            }
        
        }
        catch(error){
            return res.status(403).send('Check your data and try again!'); 
        }
}
  
}