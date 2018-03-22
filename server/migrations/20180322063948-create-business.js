module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessCategory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessWebsite: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Businesses');
  }
};
