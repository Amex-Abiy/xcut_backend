const express = require('express');
const userController = require('../controllers/userController');

const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.put('/editProfile', isAuth, userController.editProfile)

router.post('/addFavorite/:barberShopId', isAuth, userController.addFavorite)

router.post('/setAppointment/:barberShopId', isAuth, userController.setAppointment)

module.exports = router;