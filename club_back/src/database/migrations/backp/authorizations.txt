'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('authorizations', { 
        id: {
          type: Sequelize.STRING(45),
          primaryKey: true,
          //autoIncrement: true,
        },
        /*code: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true
        },*/
        fk_associate_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'associates',
            key: 'id',
            onUpdate: 'CASCADE'
          }
        },
        fk_advert_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'adverts',
            key: 'id',
            onUpdate: 'CASCADE'
          }
        },
        created_at: {
          type: 'TIMESTAMP',
          allowNull: false
        },
        updated_at: {
          type: 'TIMESTAMP',
          allowNull: false
        },
        tm_val: {
          type: 'TIMESTAMP',
          allowNull: true
        }
        
      });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('authorizations');

  }
};
