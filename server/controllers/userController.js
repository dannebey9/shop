const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const Console = require("console");


const generateJwt = (id, email, role, basketId) => {
  return jwt.sign(
    {id: id, email, role, bId: basketId},
     process.env.SECRET_KEY,
     {expiresIn: '24h'}
  )
}


class UserController {
  async registration (req, res, next) {
    const {email, password, role} = req.body
    if(!email || !password) {
      return next(ApiError.badRequest('Некорректный E-mail или пароль'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким E-mail уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword})
    const basket = await Basket.create({userId: user.id})
    console.log(basket.id);
    const token = generateJwt(user.id, user.email, user.role, basket.id)
    return res.json({token, bId: basket.id })
  }
  async login (req, res, next) {
    const {email, password} = req.body
    Console.log(req.body);
    const user = await User.findOne({ where:{email: email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким E-mail не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const basket = await Basket.findOne({where:{userId: user.id}})
    const token = generateJwt(user.id, user.email, user.role, basket.id)
    return res.json({token})
  }
  async check (req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }

}

module.exports = new UserController()