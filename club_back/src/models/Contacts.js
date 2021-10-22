const { Model, DataTypes } = require ('sequelize');

class Contacts extends Model {
    static init(sequelize) {
        super.init({
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            fk_busi_id: DataTypes.INTEGER
        },{
            sequelize
        })
    }
    static associate = function(models){
        this.belongsTo(models.Businesses, {
            foreignKey: 'fk_busi_id', as: 'businesses'
        });
    }
}

module.exports = Contacts;