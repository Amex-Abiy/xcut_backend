const mongoose = require('mongoose');

const BarberShopSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number,
        default: 0
    },
    appointments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    location: {
        required: true,
        // {longitude: smtng, latitude: smting }
        type: Object
    },
    review: {
        // {user: mongoose.Schema.Types.ObjectId, review: smthing}
        type: [Object],
        default: []
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('BarberShop', BarberShopSchema);