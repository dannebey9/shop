const Router = require('express')
const router = new Router()
const basketProductController = require('../controllers/basketProductController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware,basketProductController.getAll);
router.post('/', authMiddleware,basketProductController.addProduct);

module.exports = router;