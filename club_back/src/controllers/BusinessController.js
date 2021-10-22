const Businesses = require ('../models/Businesses');
const Owners = require ('../models/Owners');
const Contacts = require ('../models/Contacts');

const { appendFile } = require('fs');

module.exports = {

    async businessOfUser (req, res) {
        const { id } = req.body;
        try{
                /*const verify = await Businesses.findAll({
                    attributes: ['id','categorie_id', 'logo', 'name', 'fk_owner_id'],
                    include: [{
                        association: 'owners',
                        required: true,
                        where: { fk_user_id: id }
                    }]
                })*/
                const verify = await Businesses.findOne({
                    attributes: ['id','categorie_id', 'logo', 'name', 'fk_owner_id'],
                    include: [{
                        association: 'owners',
                        required: true,
                        where: { fk_user_id: id }
                    }]
                })
                if(verify){
                    return res.status(200).json(verify);
                }
                return res.status(401).send('There is already a deal for the user.');
        }
        catch(error){
            return res.status(403).send('Please, try again!');
        }
    },

    /* Função em desuso - Multiplos CNPJ's
    async informBusinesses (req, res) {
        const { cnpj } = req.body;
        try{
                const verify = await Businesses.findOne({
                    attributes: ['id','categorie_id', 'logo', 'name', 'fk_cnpj_id', 'fk_owner_id'],
                    include: [{
                        association: 'cnpjs',
                        required: true,
                        where: { cnpj: cnpj }
                    }]
                });
                console.log(verify);
                if(verify){
                    return res.status(200).json(verify);
                }
                return res.status(401).send('There is already a deal for the user.');
        }
        catch(error){
            return res.status(403).send('Please, try again!'+error);
        }
    },*/

    async updated (req, res) {
        
        const { categorie_id, name, id } = req.body;
        const file = req.file.filename;
        try{
            /*const company = await Cnpjs.findOne({
                where: { cnpj: cnpj }
            });
            if(company){
            const owners = await Owners.findOne({
                where: { fk_user_id: id }
            });
            if(owners)
            await Businesses.findOne({ attributes: ['id'], where: { fk_cnpj_id: company.id }});*/
                const verify = await Businesses.findOne({
                    attributes: ['id','categorie_id', 'logo', 'name', 'fk_owner_id'],
                    include: [{
                        association: 'owners',
                        required: true,
                        where: { fk_user_id: id}
                    }]
                });
                if(verify){
                    await Businesses.update({
                        categorie_id: categorie_id,
                        logo: file,
                        name: name,
                        }, {    where: { id: verify.id }    });
                   
                    return res.status(200).send('Updated Companies');
                }
                return res.status(401).send('There is already a deal for the user.');
            }
            /*return res.status(401).send('There is no seller');
            }       return res.status(401).send('there is no CNPJ registered for this amount');
        }*/
        catch(error){
            return res.status(403).send('Please, try again!'+error);
        }
    },

    async created (req, res) {
        const { categorie_id, name, id } = req.body;
        const file = req.file.filename;
        try {
            const owners = await Owners.findOne({
                where: { fk_user_id: id }
            });
            if(owners){
                if(!await Businesses.findOne({ attributes: ['id'], where: {fk_owner_id: owners.id }})){
                    const businesses = await Businesses.create({
                        categorie_id: categorie_id,
                        fk_owner_id: owners.id,
                        name: name,
                        logo: file
                    });

                    return res.status(200).send({businesses});
                }
                return res.status(401).send('There is already a deal with this CNPJ.');
            }
            return res.status(401).send('There is no seller');
        }
        catch(error){
            return res.status(403).send('Please, try again!');
        }
        
    },
    async appendImage (req, res) {
        /*const authHeader = req.headers.authorization.split(' ');
        const [, token ] = authHeader; 
        const image = req.file.filename;
        try{
            const owners = await Owners.findOne({
                include: [{
                    association: 'users',
                    required: true,
                    where: { token_access: token }
                }]
            });
            if(owners){
                const verify = await Businesses.findOne({ attributes: ['id'], where: { owners_id : owners.id }})
                if(verify){
                    const businesses = await Businesses.update({
                        logo: image
                        }, {    where: { id: verify.id }    });
                    return res.status(200).send('Busy logo!');
                }
                return res.status(401).send('There is already a deal for the user.');
            }
            return res.status(401).send('There is no seller');
        }
        catch(error){
            return res.status(403).send('Please, try again!');
        }*/
        console.log("Rota em desuso // substituida pela created");
    },

    async listener (req, res) {
        try {
            const shops = await Businesses.findAll({
                attributes: ['id','categorie_id', 'logo', 'name', 'fk_owner_id', 'habilited'],
                where: { habilited: 'Sim' }
            });
            return res.status(200).send({shops});
        }catch(error) {
            return res.status(403).send('Please, try again!');
        }
    }
   
}