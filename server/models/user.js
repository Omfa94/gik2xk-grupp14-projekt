module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [4, 200],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [10, 20],
      },
    },
    
    
  },
  { underscored: true });
};
