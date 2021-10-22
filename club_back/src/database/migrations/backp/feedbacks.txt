'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedbacks', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      description: {
        type: Sequelize.STRING(105),
        allowNull: true,
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
    return queryInterface.dropTable('feedbacks');
  }
};
