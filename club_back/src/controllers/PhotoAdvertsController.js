const Adverts = require ('../models/Adverts');
const Owners = require ('../models/Owners');
const Photoadverts = require ('../models/Photoadverts');
const Businesses = require('../models/Businesses');

const path = require ('path');
const fs = require ('fs');

module.exports = {
    async appendImages (req, res) {

        const id = req.params.id;
        const arrayImage = req.files;
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
                    attributes: ['id', 'owners_id'],
                    where: { owners_id: owners.id }
                });
                const adverts = await Adverts.findOne({
                    where: { id: id, business_id: businesses.id, }
                });
                if(adverts){
                    const photolimits = await Photoadverts.findAll({
                        attributes: ['id', 'adverts_id'],
                        where: {adverts_id: adverts.id}
                    });
                    console.log(photolimits.length)
                        if(photolimits.length===0){
                            for(let i=0; i<arrayImage.length; i++){
                                await Photoadverts.create({
                                    name: arrayImage[i].filename,
                                    adverts_id: id
                                });
                            }
                            return res.status(200).send('Images inserted in the ad successfully!');
                        }
                        return res.status(401).send('Images have already been uploaded for this ad.');
                }
                return res.status(401).send('Impossible to insert images for applications that are not lost by the user.');
            }
            return res.status(401).send('Seller was not found, contact support.');
    }
    catch(error){
        return res.status(403).send('Please try again with a maximum limit of 5 files per ad.')
    }
},
    async deleteImages(req, res){

        const id = req.params.id;

        const owners = await Owners.findOne({
            include: {
                association: 'users',
                required: true,
                where: { token_access: token }
            }
        });
        if(owners){
            const businesses = await Businesses.findOne({
                attributes: ['id', 'owners_id'],
                where: { owners_id: owners.id }
            });
            if(businesses){
                const photoadverts = await Photoadverts.findAll({
                    attributes:['id', 'name'],
                    include: {
                        association: 'adverts',
                        required: true,
                        where: {id: id}
                    }
                });
                for(let i=0; i<photoadverts.length; i++){
                        if(fs.stat(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', photoadverts[i].name), (err)=>{
                            if(err){
                                console.log(err)
                            }
                            try{
                                Photoadverts.destroy({where: {id:photoadverts[i].id}})
                                    fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', photoadverts[i].name), (err)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        console.log(photoadverts[i].name+" Deleted!");
                                    });
                                }
                            catch(error){
                                return res.status(401).send('Photo not found in our database. Please try again.');
                            }
                        }))
                return res.status(401).send('Photo not found in our database. Please try again.');
            }
            return res.status(200).send('The photos for the selected ad have been deleted.');
            
        }
        return res.status(401).send('This ad does not belong to your business.');
    }
    return res.status(401).send('Seller was not found, contact support.');
},

async finded(req, res){

    const id = req.params.id;

    const owners = await Owners.findOne({
        include: {
            association: 'users',
            required: true,
            where: { token_access: token }
        }
    });
    
return res.status(401).send('Seller was not found, contact support.');
},

async findedAll(req, res){

    const id = req.params.id;

    const owners = await Owners.findOne({
        include: {
            association: 'users',
            required: true,
            where: { token_access: token }
        }
    });
    
return res.status(401).send('Seller was not found, contact support.');
}

}