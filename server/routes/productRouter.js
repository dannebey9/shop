const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/CheckRoleMiddleware')
//const authMiddleware = require("../middleware/authMiddleware");


router.post('/', checkRole('ADMIN'), productController.create)
router.get('/',  productController.getAllUser)
router.get('/getadmin', productController.getAllAdmin)
router.get('/:id', productController.getOne)

module.exports = router