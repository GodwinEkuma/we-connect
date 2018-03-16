module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      businessPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessEmail: {
        type: Sequelize.STRING,
        alloWNull: false,
      },
      businessCategory: {
        type: Sequelize.STRING,
        alloWNull: false,
      },
      businessWebsite: {
        type: Sequelize.STRING,
        allowNull: true
      },
      businessDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      businessAddress: {
        type: Sequelize.STRING,
        allowNull: false
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
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Businesses');
  }
};
