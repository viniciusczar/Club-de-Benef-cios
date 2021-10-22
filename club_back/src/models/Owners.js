const { Model, DataTypes } = require ('sequelize');

class Owners extends Model {
    static init(sequelize){
        super.init({
            fk_user_id: DataTypes.STRING,
            habilited: DataTypes.CHAR
        }, {
            // padrão
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Businesses, { 
            as: 'businesses'
         }),

        this.belongsTo(models.User, {
            foreignKey: 'fk_user_id',
            as: 'users'
        })
    }
  
}

module.exports = Owners;