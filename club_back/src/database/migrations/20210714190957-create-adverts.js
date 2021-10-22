'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('adverts', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        fk_busi_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'businesses',
            key: 'id',
            onUpdate: 'CASCADE'
          }
        },
        dsc: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        vl_or: {
          type: Sequelize.DOUBLE,
          allowNull: true
        },
        vl_desc: {
          type: Sequelize.DOUBLE,
          allowNull: true
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
      return queryInterface.dropTable('adverts');
  }
};
