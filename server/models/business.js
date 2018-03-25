module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    businessPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessWebsite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Business.associate = (models) => {
    // associations can be defined here
    Business.hasMany(models.Review, {
      foreignKey: 'businessId'
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};
