const express = require ('express')
const routes = express.Router();

const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const crypto = require ('crypto');

const salt = bcrypt.genSaltSync(10);

const mailer = require ('../modules/mailer');

const User = require ('../models/User');
const Associates = require ('../models/Associates');
const Owners = require ('../models/Owners');

const authConfig = require ('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 14400,
        algorithm: "HS256"
     })
}


module.exports =  {

    async validateAssociate(req, res){

        const { cpf_u, pass_u } = req.body;
    try{
        const user = await User.findOne({ 
            where: {id: cpf_u},
            attributes: {
                exclude: ['data_nascimento','token_access', 'password_reset_token', 'password_reset_expires']
            } });
        const associate = await Associates.findOne({
            where: {
                fk_user_id: cpf_u,
                habilited: 'Sim'
            }
         })
        if(!user) {
            return res.send(401).send({ error: 'User not found!'})
        }
        else if(user && !associate){
            return status(401).send('Associate not allowed');
        }
        else {
            if(await bcrypt.compare(pass_u, user.password)){
                user.password = undefined;
                    console.log('Success!');

                    let token = generateToken({ id: user.id });
                    await User.update({
                        token_access: token
                    }, {
                        where: { id: user.id }
                    });
                    console.log(token);
                    return res.send({user, token});
                    
                }

                return res.status(401).send('Invalid Password');
            }   

    } catch (e){
    console.log(e)

    return res.status(400).send('Please, try again');
    }
},
    async validateOwner(req, res){

        const { cnpj_u, pass_u } = req.body;

    try {
        /*const company = await Cnpjs.findOne({
            where: {cnpj: cnpj_u}
        });*/


        //if(company){
        const user = await User.findOne({ 
            where: { cnpj: cnpj_u },
            attributes: {
                exclude: ['data_nascimento','token_access', 'password_reset_token', 'password_reset_expires']
            } });
        const owner = await Owners.findOne({
            where: {
                fk_user_id: user.id,
                habilited: 'Sim'
            }
         });
        if(!user){
            return res.status(401).send({ error: 'User not found!'})
        }
        else if(user && !owner){
            return res.status(401).send('Salesperson not qualified. Please contact support.')
        }
        else {
            var password = user.password;
            if(await bcrypt.compare(pass_u, password)){
                user.password = undefined;
                console.log('Success!')
                //TOKEN
                let token = generateToken({ id: user.id });
                await User.update({
                    token_access: token
                }, {
                    where: { id: user.id }
                });
                return res.send({ user, token });
            }
        }
            
            return res.status(401).send('Invalid Password');
        }
        /*    return res.status(401).send('A business has not yet been created for this CNPJ'); 
        }*/
         catch (e){
        console.log(e);
        return res.status(400).send('Please, try again'+e);
        }
    },

    async validateAdmin(req, res){

        //const [, hash] = req.headers.authorization.split(' ');
        //const [cpf_u, pass_u] = Buffer.from(hash, 'base64').toString().split(':');
        const { cpf_u, pass_u } = req.body;

    try{
        const user = await User.findOne({ 
            where: {id: cpf_u, admin: 'Sim'},
            attributes: {
                exclude: ['data_nascimento','token_access', 'password_reset_token', 'password_reset_expires']
            } });
       
        if(!user) {
            return res.send(401).send({ error: 'User not found!'})
        }
        else {
            if(await bcrypt.compare(pass_u, user.password)){
                user.password = undefined;
                    console.log('Success!');

                    let token = generateToken({ id: user.id });
                    await User.update({
                        token_access: token
                    }, {
                        where: { id: user.id }
                    });
                    return res.send({ user, token });
                }
                
                return res.status(401).send('Invalid Password');
            }   

    } catch (e){
    console.log(e)
    return res.status(400).send('Please, try again');
    }
},
    async forgotPassword (req, res) {
        const { id, data_nascimento } = req.body;

        try {
            const log = await User.findOne({
                where: { 
                id: id,
                data_nascimento: data_nascimento }
            });

            if(!log){
                return res.send(401).send({ error: 'User not found!'})
            }
            
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours()+1);
            await User.update({
                password_reset_token: token,
                password_reset_expires: now
            }, {
                where: {
                    id: id
                }
            });
         const { user } = require ('../config/mail.json');
             mailer.sendMail({
                 from: user,
                 to: log.email,
                 subject: "Recuperação de Senha",
                 //template: 'sendmail',
                 html: `<p>Esqueceu a sua senha? Não tem problema, utilize este link para refazê-la: </p><a href="http://localhost:3000/trocar_senha/?${id}&?${token}">Clique Aqui</a>`
             }, (error) =>{
                  if(error){
                      return res.status(400).send({error: 'Cannot send forgot password email'})
                  }
                  return res.status(200).send('A message with instructions for recovering your password was sent to the registered email.')
              })

        }catch (err) {
            res.status(400).send({ error: 'Erro on forgot password, try again' })
        }

    },
    async resetPassword (req, res){
        const { id, token, password } = req.body;

        try{
            const user = await User.findOne({
                id
            });
            if(!user){
                return res.status(400).send({ error: 'User not found!'})
            }
            else if(token !== user.password_reset_token){
                return res.status(400).send({ error: 'Token invalid' })
            }
            const now = new Date();
            if(now > user.password_reset_expires){
                return res.status(400).send({ error: 'Token expired, generate a new one' });
            }
            const hash = bcrypt.hashSync(password, salt);

            user.password = hash;

            if(await user.save()){
                return res.status(200,'/');
            }
            return res.status(403).send('Please, try again! ')
            

        }catch(err){
            res.status(400).send({ error: 'Cannot reset password, try again' });
        }
    }

};