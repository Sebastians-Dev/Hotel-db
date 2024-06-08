const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
});

module.exports = City;