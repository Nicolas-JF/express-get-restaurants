module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      timestamps: true,
    });
  
    return Restaurant;
  };
  