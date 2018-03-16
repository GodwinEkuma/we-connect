module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessEmail: {
      type: DataTypes.STRING,
      alloWNull: false,
    },
    businessCategory: {
      type: DataTypes.STRING,
      alloWNull: false,
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
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId'
    });
  };

  return Business;
};
