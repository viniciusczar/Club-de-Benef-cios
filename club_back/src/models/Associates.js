const { Model, DataTypes } = require ('sequelize');

class Associates extends Model {
    static init(sequelize){
        super.init({
            fk_user_id: DataTypes.STRING,
            habilited: DataTypes.CHAR,
        }, {
            // padrão
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'fk_user_id', as: 'users'});
        this.hasMany(models.Authorizations, { as: 'authorizations' })
    }
}

module.exports = Associates;