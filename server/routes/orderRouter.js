const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, OrderController.getAllOrder)
router.post('/create', authMiddleware, OrderController.CreateOrder)
router.post('/complete', authMiddleware, OrderController.updateOrder)
router.post('/remove', authMiddleware, OrderController.OrderRemove)
router.get('/check', authMiddleware, OrderController.getAllOrderProduct)

module.exports = router;