const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole(2), brandController.create)
router.post('/change', checkRole(2),  brandController.changeBrand)
router.post('/del', checkRole(2),  brandController.delBrand)
router.get('/', brandController.getAll)

module.exports = router