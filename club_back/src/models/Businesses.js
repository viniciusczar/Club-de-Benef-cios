const { Model, DataTypes } = require ('sequelize');

class Businesses extends Model {
    static init(sequelize){
        super.init({
            categorie_id: DataTypes.INTEGER,
            fk_owner_id: DataTypes.INTEGER,
            logo: DataTypes.STRING,
            name: DataTypes.STRING,
        }, {
            sequelize
        })
       
    }
       
       static associate = function(models){

        this.belongsTo(models.Owners, {
            through: 'user', foreignKey: 'fk_owner_id', as: 'owners'
        }),
        /*this.belongsTo(models.Categories, {
            foreignKey: 'categorie_id', as: 'categories'
        }),*/
        this.hasMany(models.Adverts, {
            as: 'adverts'
        }),
        this.hasMany(models.Contacts, {
            as: 'contacts'
        })
        /*this.hasMany(models.FeedBacks, {
            as: 'feedbacks'
        })*/
        }

   
       
}


module.exports = Businesses;
