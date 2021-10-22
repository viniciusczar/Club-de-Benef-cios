const { Model, DataTypes } = require ('sequelize');


class Photoadverts extends Model {
    static init (sequelize){
        super.init({
            name: DataTypes.STRING,
            fk_advert_id: DataTypes.INTEGER
        }, {
            sequelize 
        })
    }

    static associate = function(models){
        this.belongsTo(models.Adverts, {
            foreignKey: 'fk_advert_id', as: 'adverts'
        })
    }

}

module.exports = Photoadverts;