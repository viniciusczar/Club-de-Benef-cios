'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('favorites', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true 
        },
        fk_associate_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'associates',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
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
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('favorites');
  }
};
