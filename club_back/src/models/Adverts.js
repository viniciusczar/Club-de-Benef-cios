const { Model, DataTypes } = require ('sequelize');

class Adverts extends Model {
    static init(sequelize) {
        super.init({
            fk_busi_id: DataTypes.INTEGER,
            dsc: DataTypes.STRING,
            vl_or: DataTypes.DOUBLE,
            vl_desc: DataTypes.DOUBLE
        },{
            sequelize
        })
    }
    static associate = function(models){
        this.belongsTo(models.Businesses, {
            foreignKey: 'fk_busi_id', as: 'businesses'
        });
        this.hasOne(models.Photoadverts, {
            as: 'photoadverts'
        });
        this.hasOne(models.Authorizations, {
            as: 'authorizations'
        });
    }
}

module.exports = Adverts;