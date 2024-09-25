const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');

const Text = sequelize.define('Text', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Default to the current timestamp
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Also default to the current timestamp
  },
});

module.exports = Text;

