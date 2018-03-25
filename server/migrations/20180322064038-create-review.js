module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviewName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviewDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      businessId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Businesses',
          key: 'id',
        }
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Reviews');
  }
};
