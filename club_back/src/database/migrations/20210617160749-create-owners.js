'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('owners', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fk_user_id: {
          type: Sequelize.STRING(20),
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        },
        habilited: {
          type: 'char(3)',
          allowNull: true,
          defaultValue: 'Sim'
        },
        created_at: {
          type: 'TIMESTAMP',
          allowNull: false
        },
        updated_at: {
          type: 'TIMESTAMP',
          allowNull: false
        }
       
      });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('owners');

  }
};
