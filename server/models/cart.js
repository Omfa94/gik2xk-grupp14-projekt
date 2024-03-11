module.exports = (sequelize, DataTypes) => {
    return sequelize.define("cart",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          payed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:false
          }
    },
    {underscored: true});
}