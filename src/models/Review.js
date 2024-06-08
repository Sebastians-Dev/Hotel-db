const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Review = sequelize.define('reviem', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //hotelId
    //userId
});

module.exports = Review;