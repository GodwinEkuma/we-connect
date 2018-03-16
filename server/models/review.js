module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    reviewTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewDescription: {
      type: DataTypes.STRING,
      alloWNull: false,
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
