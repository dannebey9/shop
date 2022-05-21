const Router = require('express')
const router = new Router()
const basketProductController = require('../controllers/basketProductController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware,basketProductController.getAll);
router.post('/add', authMiddleware,basketProductController.addProduct);
router.post('/del', authMiddleware,basketProductController.delItem);
router.post('/decrement', authMiddleware,basketProductController.decrementItem);

module.exports = router;