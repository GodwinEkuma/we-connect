module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      reviewTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reviewName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviewDescription: {
        type: Sequelize.STRING,
        alloWNull: false,
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
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      businessId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Businesses',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Reviews');
  }
};
