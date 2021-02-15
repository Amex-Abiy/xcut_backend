const express = require('express');
const barberController = require('../controllers/barberController');

const router = express.Router();

router.post('/addBarberShop', barberController.addBarberShop)

router.get('/searchBarberShop/:searchKey', barberController.searchBarberShop)

module.exports = router;