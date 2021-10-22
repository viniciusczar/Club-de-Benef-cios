const { Model, DataTypes } = require ('sequelize');

class Categories extends Model {
    static init(sequelize){
        super.init({
            dsc: DataTypes.STRING
        }, {
            // padrão
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Businesses, { 
            as: 'categories'
         });
    }
}

module.exports = Categories;