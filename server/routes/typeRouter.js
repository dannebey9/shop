const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole(2),typeController.create)
router.post('/change', checkRole(2),  typeController.changeType)
router.post('/del', checkRole(2),  typeController.delType)
router.get('/',  typeController.getAll)

module.exports = router