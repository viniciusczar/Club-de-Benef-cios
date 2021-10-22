const Categories = require ('../models/Categories');

module.exports = {

    async store(req,res){
        const { dsc } = req.body;

        const categorie = await Categories.create({
            dsc
        });

        return res.json (categorie)
    },

    async listener(req,res){
        const categories = await Categories.findAll();
        return res.json (categories);
    }

}