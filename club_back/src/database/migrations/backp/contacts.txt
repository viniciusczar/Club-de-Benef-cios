'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('contacts', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
       },
       email: {
         type: Sequelize.STRING,
         allowNull: true
       },
       telefone: {
         type: Sequelize.STRING(14),
         allowNull: true
       },
       fk_busi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'businesses',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('contacts');
  }
};
