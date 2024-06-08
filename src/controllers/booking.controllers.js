const catchError = require('../utils/catchError');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const {userId, hotelId, offset, perPage} = req.query;
    const where = {};
    if(userId) where.userId = userId;
    if(hotelId) where.hotelId = hotelId;
    const results = await Booking.findAll({
        include:[User, {model:Hotel, include:[Image]}],
        where:where,
        offset: offset,
        limit: perPage,

    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const{ hotelId, checkIn, checkOut } = req.body;
    const result = await Booking.create({
        hotelId,
        userId: req.user.id,
        checkIn,
        checkOut,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Booking.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;
    const result = await Booking.update(
        {checkIn,checkOut},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}