'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.STRING(45),
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(65),
          allowNull: false
        },
        data_nascimento: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: true,
          unique: true,
          lowercase: true
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true,
          select: false
        },
        password_reset_token: {
          type: Sequelize.STRING(255),
          allowNull: true,
          select: false
        },
        password_reset_expires: {
          type: Sequelize.DATE,
          allowNull: true,
          select: false
        },
        token_access: {
          type: Sequelize.STRING(455),
          allowNull: true,
          select: false
        },
        cnpj: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        telefone: {
          type: Sequelize.STRING(14),
          allowNull: true
        },
        admin: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: 0
        },
        created_at: {
          type: 'TIMESTAMP',
          allowNull: true
        },
        updated_at: {
          type: 'TIMESTAMP',
          allowNull: true
        }
      });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('users');
    
  }
};
