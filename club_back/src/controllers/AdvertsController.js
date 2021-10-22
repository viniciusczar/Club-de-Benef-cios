const Adverts = require ('../models/Adverts');
const Businesses = require ('../models/Businesses');
const Owners = require ('../models/Owners');
const Associates = require ('../models/Associates');
const Categorie = require ('../models/Categories');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//const connection = require ('../config/directconn');


module.exports = {

    async store (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader; 
        const { dsc, vl_or, vl_desc } = req.body;
        try{
            const owners = await Owners.findOne({
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
    
            if(owners.habilited === 'Sim'){
                const businesses = await Businesses.findOne({
                    attributes: ['id'],
                    where: { fk_owner_id: owners.id }});
                    console.log(businesses.id)
                    if(businesses.id){
                        const adverts = await Adverts.create({
                            fk_busi_id: businesses.id,
                            dsc: dsc,
                            vl_or: vl_or,
                            vl_desc: vl_desc
                        });
                        return res.status(200).send('Ad successfully created')
                    }
                    return res.status(401).send('The company has not yet been created.');
            }
            return res.status(401).send('The user is not enabled. Please contact Cooperative support.')
            
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    },

    async show (req, res){
        const adv_id = req.params.id;
        try{
            const owners = await Owners.findOne({
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(owners){
                const businesses = await Businesses.findOne({
                    attributes: ['id'],
                    where: { fk_owner_id: owners.id }});
                    if(businesses.id){
                        const adverts = await Adverts.findOne({
                            attributes: ['id', 'dsc', 'vl_or', 'vl_desc', 'created_at'],
                            where: { id: fk_adv_id }
                        });
                        if(adverts!=null){
                        return res.status(200).send({adverts});
                        }
                        return res.status(401).send('There is no ad for this id yet.');
                    }
                    return res.status(401).send('The company has not yet been created.');
            }
            return res.status(401).send('Seller was not found, contact support.');
        }
        catch(error){
            return res.status(403).send('Please, try again!');
        }
    },

    async list (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        
        const owners = await Owners.findOne({
            include: {
                association: 'users',
                required: true,
                where: { token_access: token }
            }
        });
        if(owners){
            const businesses = await Businesses.findOne({
                attributes: ['id'],
                where: { fk_owner_id: owners.id }});
                if(businesses.id){
                    const adverts = await Adverts.findAll({
                        attributes: ['id', 'dsc', 'vl_or', 'vl_desc', 'created_at'],
                        where: { fk_busi_id: businesses.id }
                    });
                    if(adverts!=null){
                    return res.status(200).send({adverts});
                    }
                    return res.status(401).send('No ads yet.');
                }
                return res.status(401).send('The company has not yet been created.');
        }
        return res.status(401).send('Seller was not found, contact support.');
            
    },
    async deleted (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const adv_id = req.params.id;

        try{ 
            const owners = await Owners.findOne({
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(owners.habilited === 'Sim'){
                    if(await Businesses.findOne({ attributes: ['id'], where: { fk_owner_id: owners.id }})){
                        if(await Adverts.destroy({where: { id: adv_id }})){
                            return res.status(200).send('Authorization successfully deleted!');
                        }
                        return res.status(200).send('No authorization');
                    }
                return res.status(401).send('The company has not yet been created.');
            }
            return res.status(401).send('Seller was not found, contact support.');
        }
        catch(error){
            return res.status(403).send('Please, try again!')
        }
    },
    async updated (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const { id, dsc, vl_or, vl_desc } = req.body;
        try{
            const owners = await Owners.findOne({
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(owners.habilited === 'Sim'){
                    if(await Businesses.findOne({attributes: ['id'], where: { fk_owner_id: owners.id }})){
                        if(await Adverts.findOne({ where: { id: id } })){
                            await Adverts.update({dsc: dsc, vl_or: vl_or, vl_desc: vl_desc}, {where: { id: id }})
                                return res.status(200).send('Ad successfully updated!');
                        }
                        return res.status(401).send('Ad does not exist, please check id');
                    }
                    return res.status(401).send('The company has not yet been created.');
            }
            return res.status(401).send('The user is not enabled. Please contact Cooperative support.');

        }catch(error){
            return res.status(403).send('Please, try again!')
        }
    },

    async explore_for_name (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const ref = req.body.dsc;
        //const { page = 1} = request.query;
        try{
            const query = await Associates.findOne({
                attributes: ['id', 'habilited'],
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(query.habilited === 'Sim'){
                const search = await Adverts.findAll({
                    where: { dsc: { [Op.like]: '%'+ref+'%'} }
                })
                
                const number = await Adverts.findAndCountAll({
                    where: { dsc: { [Op.like]: '%'+ref+'%'} }
                })
                if(search){
                    //var array = [];
                    var control_format = [];
                    for(let i=0; i<number.count; i++){
                        console.log(i+1);
                        const businesses = await Businesses.findOne({
                            attributes: ['id','owners_id'],
                            where: { id: search[i].fk_busi_id, habilited: 'Sim' }
                        });
                            if(businesses){
                                //array[i]=JSON.stringify(search[i]);
                                control_format[i]=JSON.parse(JSON.stringify(search[i]));
                        }
                    }
                    return res.status(200).send({control_format});
                }
                return res.status(401).send('Ad does not exist, please check description');
                
            }
            return res.status(401).send('The user is not enabled. Please contact Cooperative support.');
        }
        catch(error){
            return res.status(403).send('Please, try again!')
        }
    },
    async explore_for_categorie (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const cat = req.body.cat;
        
        try {
            const query = await Associates.findOne({
                attributes: ['id', 'habilited'],
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(query.habilited === 'Sim'){
                const categorie = await Categorie.findOne({
                    where: { dsc: cat }
                });
                if(categorie){
                    var array = [];
                        const businesses = await Businesses.findAll({
                            attributes: ['id', 'owners_id'],
                            where: { fk_categorie_id: categorie.id, habilited: 'Sim' }
                        });
                        if(businesses){
                            for(let i=0; i<businesses.length; i++){
                                    const adverts = await Adverts.findAll({
                                        where: { fk_busi_id: businesses[i].id }
                                    })
                                    for(let j=0; j<adverts.length; j++){
                                        //console.log(adverts[j]);
                                        array[j]=JSON.parse(JSON.stringify(adverts[j]));
                                    }
                            }
                            return res.status(200).send({array});
                        }
                    return res.status(401).send('There are no businesses in this category.')
                }
                return res.status(401).send('Non-existent category! Please check the data and try again.');
            }
            return res.status(401).send('The user is not enabled. Please contact Cooperative support.');
        }
        catch(error){
            return res.status(404).send('Please, try again!')
        }
    },
 
    async explore_for_bs (req, res){
        const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader;
        const name = req.body.name;

         const query = await Associates.findOne({
                attributes: ['id', 'habilited'],
                include: {
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }
            });
            if(query.habilited === 'Sim'){
                const businesses = await Businesses.findOne({
                    attributes: ['id'],
                    where: { name: name, habilited: 'Sim' }
                });
                if(businesses){
                        adverts = await Adverts.findAll({
                            where: { fk_busi_id: businesses.id }
                        })
                        return res.status(200).send({adverts});
                    }
                    return res.status(401).send('There are no companies authorized with this name. To answer questions contact support');
                }
                return res.status(401).send('The user is not enabled. Please contact Cooperative support.');
            }

}

    