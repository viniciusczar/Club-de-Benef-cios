const { findAll } = require('../models/Contacts');
const Contacts = require ('../models/Contacts');

module.exports = {
    async create(req, res) {
        const { id, telefone, email, id_business  } = req.body;
        try {
            if(await Contacts.create({
                telefone: telefone,
                email: email,
                fk_busi_id: id_business
            }, 
            {
                include: [{
                association: 'businesses',
                required: true,
                include: [{
                    association: 'owners',
                    required: true,
                    where : {
                        fk_user_id: id
                    }
                }]
            }]
            }
                )) {
                return res.status(200).send('Successfull!');
            }
            return res.status(200).send('Failed!');
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    },
    async update(req, res) {
        const { id, telefone, email, id_business } = req.body;
        try {
            if(await Contacts.update({
                telefone: telefone,
                email: email,
                fk_busi_id: id_business
            }, 
            {
                include: [{
                association: 'businesses',
                required: true,
                include: [{
                    association: 'owners',
                    required: true,
                    where : {
                        fk_user_id: id
                    }
                }]
            }]
            }
                )) {
                return res.status(200).send('Successfull!')
            }
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    },
    async find(req, res) {
        const { id } = req.params;
        try {
            const finded = await Contacts.findAll({
                attributes: ['id', 'email', 'telefone', 'fk_busi_id'],
                where: {
                    fk_busi_id: id
                }});
            return res.status(200).send({finded});
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    }
}

/*

async find(req, res) {
        const { id } = req.params;
        try {
            const finded = await Contacts.findOne({
                telefone: telefone,
                email: email
            }, 
            {
                include: [{
                association: 'businesses',
                required: true,
                include: [{
                    association: 'owners',
                    required: true,
                    where : {
                        fk_user_id: id
                    }
                }]
            }]
            }
                )
            return res.status(403).send({finded});
        }catch(error){
            return res.status(403).send('Please, try again!');
        }
    }

*/