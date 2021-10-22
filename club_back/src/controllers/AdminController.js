const Businesses = require ('../models/Businesses');
const User = require ('../models/User')
const Associates = require ('../models/Associates');
const Owners = require ('../models/Owners');

module.exports = {
    
    async habilitedOwner(req, res){
        const { id, status } = req.body;
        try{
            const owner = await Owners.findOne({ where : { user_id: id }})
            if(owner){
                owner.habilited = status;
                if(owner.save()){
                    return res.status(200).send('Status: '+status+' Updated for the owner.');
                }
                return res.status(403).send('Please, try again!')
            }
            return res.status(401).send('Not found ID for seller services.');
        }catch(error){
            return res.status(403).send('Please, try again!')
        }    
    },

    async habilitedAssociate(req, res){
        const { id, status } = req.body;
        try{
            const associates = await Associates.findOne({ where: { user_id: id} })
            if(associates){
                associates.habilited = status;
                if(associates.save()){
                    return res.status(200).send('Status: '+status+' Updated for the associate.');
                }
                return res.status(403).send('Please, try again!')
            }
            return res.status(401).send('Reported buyer ID not found.');
        }catch(error){
            return res.status(403).send('Please, try again!')
        }
    }

}