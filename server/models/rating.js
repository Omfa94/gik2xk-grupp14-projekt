module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'rating',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        rating: {
          type: DataTypes.DOUBLE,
          allowNull: false
        }
      },
      { underscored: true }
    );
  };
  