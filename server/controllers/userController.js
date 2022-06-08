const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, UserRole} = require('../models/models')


const generateJwt = (id, email, role, basketId) => {
  return jwt.sign(
    {id: id, email, role, bId: basketId},
     process.env.SECRET_KEY,
     {expiresIn: '24h'}
  )
}


class UserController {
  async registration (req, res, next) {
    const {email, password} = req.body
    if(!email || !password) {
      return next(ApiError.badRequest('Некорректный E-mail или пароль'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким E-mail уже существует'))
    }
    const role = 1;
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, role, password: hashPassword})
    const basket = await Basket.create({userId: user.id})
    console.log(basket.id);
    const token = generateJwt(user.id, user.email, user.role, basket.id)
    return res.json({message: "Регистрация прошла успешно, теперь войдите в аккаунт"})
  }
  async login (req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({ where:{email: email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким E-mail не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const basket = await Basket.findOne({where:{userId: user.id}})
    const role = user.userRoleId
    const token = generateJwt(user.id, user.email, role, basket.id)
    return res.json({token})
  }
  async check (req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.bId)
    console.log(req.user)
    return res.json({token: token, role: req.user.role})
  }

  async GetUsersAdmin (req, res) {
    const getUsers = await User.findAll({
      include: [{
        model: UserRole,
        required: true
      }]
    })
    return res.json(getUsers)
  }

  async GetRoleAdmin (req, res) {
    const getRole = await UserRole.findAll()
    console.log(getRole)
    return res.json(getRole)
  }

  async changeUserAdmin (req, res) {
    const email = req.body.email
    const role = req.body.role
    await User.update({email: email, userRoleId: role}, {
      where: { id: req.body.userId }
    })
        .then(() => {
          return res.json({message: "Изменения пользователя успешно сохранены", action: "success"})
        })
        .catch((err) => {
          return res.json({message: "Произошла ошибка при измении пользователя", action: "error", log: err})
        })
  }

}

module.exports = new UserController()