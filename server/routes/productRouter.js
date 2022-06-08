const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/CheckRoleMiddleware')
const authMiddleware = require("../middleware/authMiddleware");


router.post('/', authMiddleware, productController.create)
router.get('/',  productController.getAllUser)
router.get('/getadmin', productController.getAllAdmin)
router.post('/changeadmin', productController.updateProductAdmin)
router.post('/moveAdmin', authMiddleware, productController.moveProductIncDec)
router.get('/getmove', authMiddleware, productController.getProductMove)
router.get('/:id', productController.getOne)

module.exports = router