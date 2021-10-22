'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('businesses', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        /*categorie_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        },*/
        categorie_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        fk_owner_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'owners',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        },
        /*fk_cnpj_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'cnpjs',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        },*/
        logo: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        habilited: {
          type: 'CHAR(3)',
          defaultValue: 'Sim'
        },
        name: {
          type: Sequelize.STRING(55),
          allowNull: false,
          unique: true
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

      return queryInterface.dropTable('businesses');

  }
};
