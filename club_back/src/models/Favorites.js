const { Model, DataTypes } = require ('sequelize');

class Favorites extends Model {
    static init(sequelize) {
        super.init({
            fk_associate_id: DataTypes.INTEGER,
            fk_busi_id: DataTypes.INTEGER
        },{
            sequelize
        })
    }
    static associate = function(models){
        this.belongsTo(models.Businesses, {
            foreignKey: 'fk_busi_id', as: 'businesses'
        });
        this.belongsTo(models.Associates, {
            foreignKey: 'fk_associate_id', as: 'associates'
        });
    }
}

module.exports = Favorites;