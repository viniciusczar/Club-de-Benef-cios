'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('photoadverts', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        fk_advert_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'adverts',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        },
      });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('photoadverts');
  }
};
