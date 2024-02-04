const { DataTypes, Model } = require('sequelize');
const sequelize = require("./index");

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  token: {
    type: DataTypes.STRING(255) // Use DataTypes.STRING with length
  },
}, {
  sequelize,
  modelName: "users",
  createdAt: true,
  updatedAt: true
});

console.log(User === sequelize.models.User);

module.exports = User;
