const bcrypt = require('bcrypt');
const User = require('../model/User');
const BarberShop = require('../model/BarberShop');
const asyncHandler = require('../middleware/asyncHandler');

// update password
exports.editProfile = asyncHandler(async(req, res, next) => {
    let id = req.user.id
    let { oldPassword, password } = req.body

    let user = await User.findById(id).select('+password')

    // @ts-ignore
    const isMatched = await bcrypt.compare(oldPassword, user.password)

    if (!isMatched) {
        return res.status(200).json({
            status: false,
            msg: 'Old password is incorrect'
        })
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.findByIdAndUpdate(id, { password })

    return res.status(201).json({
        status: true,
        data: user,
        msg: 'Password update successful'
    })
})

exports.addFavorite = asyncHandler(async(req, res, next) => {
    let id = req.user.id
    let barberShopId = req.params.barberShopId;

    let barberShop = await BarberShop.findOne({ _id: barberShopId })

    if (!barberShop) {
        return res.status(200).json({
            status: false,
            msg: 'BarberShop not found'
        })
    }

    let user = await User.findOneAndUpdate(id, { $push: { favorites: barberShopId } })

    if (!user) {
        return res.status(200).json({
            status: false,
            msg: 'Error adding to favorite'
        })
    }

    return res.status(201).json({
        status: true,
        msg: 'Added to favorite'
    })
})

exports.setAppointment = asyncHandler(async(req, res, next) => {
    let id = req.user.id
    let barberShopId = req.params.barberShopId;

    let barberShop = await BarberShop.findById(barberShopId)

    if (!barberShop) {
        return res.status(200).json({
            status: false,
            msg: `Barbershop not found`
        })
    }

    // @ts-ignore
    if (barberShop.appointments.includes(id)) {
        return res.status(200).json({
            status: false,
            msg: 'You already have an appointment'
        })
    }

    barberShop = await BarberShop.findOneAndUpdate(id, { $push: { appointments: id } })

    if (!barberShop) {
        return res.status(200).json({
            status: false,
            msg: `Error adding appointment`
        })
    }

    return res.status(201).json({
        status: true,
        msg: 'Appointment added'
    })
})


// exports.searchBarberShop = asyncHandler(async(req, res, next) => {

//     const { name, address } = req.body

//     let barberShop = await BarberShop.findOne({name, })
// })