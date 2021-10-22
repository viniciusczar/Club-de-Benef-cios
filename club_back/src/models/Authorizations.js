const { Model, DataTypes } = require ('sequelize');

class Authorizations extends Model {
    static init(sequelize){
        super.init({
            id: {   
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true   
            },
            fk_associate_id: DataTypes.INTEGER,
            fk_advert_id: DataTypes.INTEGER,
            tm_val: {
                type: 'TIMESTAMP'
            }
        },{
            sequelize
        })
    }
    static associate = function (models) {
        this.belongsTo(models.Associates, {
            through: 'User', foreignKey: 'fk_associate_id', as: 'associates'
        }),
        this.belongsTo(models.Adverts, {
            foreignKey: 'fk_advert_id', as: 'adverts'
        });
        /*this.hasOne(models.Businesses, {
            as: 'businesses'
        });*/
    }
}

module.exports = Authorizations;