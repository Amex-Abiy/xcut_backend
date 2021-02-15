const express = require('express');
const barberController = require('../controllers/barberController');

const router = express.Router();

router.post('/addBarberShop', barberController.addBarberShop)

module.exports = router;