// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
productApiController = require('../../controllers/api/productsController')


router.get('/latest', productApiController.latest)
router.get('/offers', productApiController.offers)
router.get('/categories/:category?', productApiController.categories)

module.exports = router


