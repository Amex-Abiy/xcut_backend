const User = require('../model/User');
const BarberShop = require('../model/BarberShop');
const asyncHandler = require('../middleware/asyncHandler');

// update password
exports.editProfile = asyncHandler(async(req, res, next) => {
    let id = req.user.id

    let user = await User.findByIdAndUpdate(id, req.body)
    if (!user) {
        return res.status(200).json({
            status: false,
            msg: 'Error updating profile'
        })
    }

    return res.status(204).json({
        status: true,
        msg: 'Profile updated successfully'
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

    console.log(barberShop.appointments, id.toString())
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