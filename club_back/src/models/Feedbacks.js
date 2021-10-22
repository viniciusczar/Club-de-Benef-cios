/*const { Model, DataTypes } = require ('sequelize');

class Feedbacks extends Model {
    static init(sequelize) {
        super.init({
            business_id: DataTypes.INTEGER,
            description: DataTypes.STRING,
        },{
            sequelize
        })
    }
    static associate = function(models){
        this.belongsTo(models.Businesses, {
            foreignKey: 'business_id', as: 'businesses'
        });
    }
}

module.exports = Feedbacks;*/

// EM CONSTRUÇÃO