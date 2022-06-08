const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/get', checkRole(2), userController.GetUsersAdmin)
router.get('/getrole', checkRole(2), userController.GetRoleAdmin)
router.post('/edit', checkRole(2), userController.changeUserAdmin)

module.exports = router