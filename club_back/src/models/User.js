const { Model, DataTypes } = require ('sequelize');
//const bcrypt = require ('bcrypt');

class User extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data_nascimento: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cnpj: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                validate: {
                    notEmpty: true
                },
                lowercase: true
            },
            password: { 
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: {
                        args: [6, 255],
                    }
                }
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: {
                        args: [14, 30],
                    }
                } },
            password_reset_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password_reset_expires: {
                type: DataTypes.DATE,
                allowNull: true
            },
            token_access: {
                type: DataTypes.STRING,
                allowNull: true
            } 
        },
        {
            sequelize
        })
        /*{
            instanceMethods: {
                toJSON: function () {
                  var values = User.assign({}, this.get());
            
                  delete values.password;
                  return values;
                }
              }
        }*/
    }

    static associate(models){
        this.hasOne(models.Owners, { as: 'owners' });
        this.hasOne(models.Associates, { as: 'associates' });
    }


}

module.exports = User;
 
    /*hooks: {
        beforeUpdate: function(user, options) {
            return cryptPassword(user.password)
              .then(success => {
                user.password = success;
              })
              .catch(err => {
                if (err) console.log(err);
              });
          }
          
        }
    }*/
