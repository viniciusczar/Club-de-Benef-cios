const Associates = require ('../models/Associates');
const Authorizations = require ('../models/Authorizations');
const Businesses = require ('../models/Businesses');
const Adverts = require ('../models/Adverts');
const Owners = require('../models/Owners');
const Users = require ('../models/User');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require ('crypto');
const User = require('../models/User');


module.exports = {
    async inventory (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;

        try{
        const owners = await Owners.findOne({
            include: [{
                association: 'users',
                required: true,
                where: { token_access: token }
            }]
        });

        const authorizations = await Authorizations.findAll({
            attributes: ['id', 'associates_id', 'advert_id', 'tm_val'],
            include: [
                {
                    association: 'adverts',
                    required: true,
                    include: [{
                        attributes: ['id', 'owners_id'],
                        association: 'businesses',
                        required: true,
                        include: [{
                            //attributes: ['id'],
                            association: 'owners',
                            required: true,
                            where: { id: owners.id }
                        }]
                    }]
                }
            ]
        });
        if(authorizations){
            var validates = [];
        for(let i=0; i<authorizations.length; i++){
            console.log(authorizations[i].associates_id);
            const associate = await Associates.findOne({
                attributes: ['id', 'user_id'],
                where: { id: authorizations[i].associates_id }
            });
            const user = await User.findOne({
                exclude: ['id', 'token_access', 'cnpj', 'credit', 
                'created_at', 'updated_at', 'password', 
                'password_reset_token', 'password_reset_expires'],
                where: { id: associate.user_id }
            });
            
            validates[i] = {
                'id': authorizations[i].id,
                'associates_id': authorizations[i].associates_id,
                'advert_id': authorizations[i].advert_id,
                'tm_val': authorizations[i].tm_val,
                'usuário': user.name,
                'telefone': user.telefone
                }
            }
                return res.status(201).send({validates});
        }
                return res.status(401).send('No authorizations generated!');
            }catch(error){
                return res.tatus(403).send('Please, try again!')
        }

    },

    async listener (req, res) {
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader; 
        try{
                const authorizations = await Authorizations.findAll({
                    attributes: ['id','associates_id', 'advert_id', 'tm_val'],
                    include: [
                        {
                            association: 'associates',
                            required: true,
                            attributes: ['id'],
                                include: [{
                                attributes: ['id'],
                                association: 'users',
                                required: true,
                                where: { token_access: token }
                        }]
                        }
                    ]
                });
                const now = new Date();
                var array_businesses = [];
                    for(let i=0; i<authorizations.length; i++){
                        if(authorizations[i].tm_val.valueOf() > now.valueOf()){
                            const businesses = await Businesses.findOne({
                                attributes: ['name'],
                                include: {
                                    association: 'adverts',
                                    required: true,
                                    where: { id: authorizations[i].advert_id }
                                }
                            });
                            authorizations[i].businesses_name = businesses.name;
                                array_businesses[i] = {
                                    'id': authorizations[i].id,
                                    'associates_id': authorizations[i].associates_id,
                                    'advert_id': authorizations[i].advert_id,
                                    'tm_val': authorizations[i].tm_val,
                                    'businesses_name': authorizations[i].businesses_name
                                }
                        }
                    }
                    if(!array_businesses){
                        return res.status(200).send('No authorizations in progress.');
                    }
                    return res.status(200).send({array_businesses});
            }catch (error) {
                return res.status(403).send('Please, try again!')
            } 
    },

    async show (req, res) {
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const auth_id = req.params.id;
    
        try{
            const associates = await Associates.findOne({
                include: [{
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }]
            });
            const authorizations = await Authorizations.findOne({
                attributes: ['id', 'associates_id', 'advert_id', 'tm_val'],
                where: { id: auth_id }
            });
            if(associates.id === authorizations.associates_id){
                const now = new Date();
                if(now.valueOf() < authorizations.tm_val.valueOf()){
                    const businesses = await Businesses.findOne({
                        attributes: ['name'],
                        include: {
                            association: 'adverts',
                            required: true,
                            where: { id: authorizations.advert_id }
                        }
                    });
                        const array_businesses = {
                            'id': authorizations.id,
                            'associates_id': authorizations.associates_id,
                            'advert_id': authorizations.advert_id,
                            'tm_val': authorizations.tm_val,
                            'businesses_name': businesses.name
                        }
                    return res.status(200).send({array_businesses});
                }
                return res.status(400).send('Authorization expired!');
            }
            return res.status(401).send('There is no such authorization for the member');
            
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    },

    async created (req, res) {
        const id = req.body.adv_id;
        
        try{
            const associates = await Associates.findOne({
                include: [{
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }]
            });
            if(associates.habilited==='Sim'){
                const code = crypto.randomBytes(4).toString('hex');
            const now = new Date();
            now.setHours(now.getHours()+48);
    
            const authorization = await Authorizations.create({
                id: code,
                associates_id: associates.id,
                fk_advert_id: id,
                tm_val: now
            });
            return res.status(200).send({authorization});
        }
        return res.status(401).send('Associate is not entitled to make purchases. Please contact support!');
            }
            
        catch (error) {
            return res.status(403).send('Please, try again!')
        }
    },

    async deleted (req, res) {
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const del_id = req.params.id;

        try{
            const associates = await Associates.findOne({
                include: [{
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }]
            });
            if(await Authorizations.destroy({where: { id: del_id, associates_id: associates.id }})){
                return res.status(200).send('Authorization successfully deleted!');
            }
            return res.status(200).send('There is no such authorization for the member');
        }catch(error){
            return res.status(403).send('Please, try again!')
        }
        
    },

}