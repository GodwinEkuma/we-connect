module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewDescription: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Review.associate = (models) => {
    // associations can be defined here
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
