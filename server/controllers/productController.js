
const path = require('path');
const {Product, ProductInfo, Type, Brand, MoveProduct, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");
const gm = require("gm");
const {response} = require("express");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, available } = req.body
      let quantity = 0
      const { img } = req.files

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          }))
      }

      const product = await Product.create({ name, price, brandId, typeId, info, available, quantity })
      let fileName = product.id + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const productImage = await Product.update({img: fileName}, {
        where: {id: product.id}
      })
      const ProdCreate = await MoveProduct.create({
        action: 5,
        userId: req.user.id,
        productId: product.id
      })

      return res.json({message: "Товар успешно добавлен", action:"success"})
    } catch (e) {
      return res.json({message: "Произошла ошибка добавления товара", action:"error"})
    }
  }

  async moveProductIncDec(req, res) {
    try{
      switch (req.body.action) {
        case 1:
          const productAvailableInc = await Product.increment({quantity: req.body.quantity}, {
            where: {id: req.body.id}
          })
            const moveProdCreateInc = await MoveProduct.create({
              action: 1,
              quantity: req.body.quantity,
              userId: req.user.id,
              price: req.body.price,
              productId: req.body.id
            })
          return res.json({message: "Товар успешно оприходован", action:"success"})

        case 2:
          const productAvailableDec = await Product.decrement({quantity: req.body.quantity}, {
            where: {id: req.body.id}
          })
          const moveProdCreateDec = await MoveProduct.create({
            action: 2,
            quantity: req.body.quantity,
            userId: req.user.id,
            productId: req.body.id
          })
            return res.json({message: "Товар успешно списан", action: "success"})

        default:
          return res.json({message: "Ошибка движения товара", action: "error"})
      }
    }
    catch (err) {
      console.log(err)
      return res.json({message: "Произошла ошибка движения товара", action: "error"})
    }
  }

  async updateProductAdmin(req, res) {
    try {
      if (!req.body.name){
        const productAvailable = await Product.update({available: req.body.available}, {
          where: {id: req.body.id}
        })
        return res.json({message: "Доступность товара изменена", action: "success"})
      }
      let { id, name, price, brandId, typeId } = req.body
      console.log("Проверка")
      if (req.files){
        const {img} = req.files
        let fileName = id + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }
      const product = await Product.update({name, price, brandId, typeId}, {
        where: {id: id}
      })
      return res.json({message:"Информация о продукте обновлена", action: "success"})
    }
    catch (err) {
      return res.json({message:"Ошибка измениния информации о товаре", action: "error"})
    }
  }

  async getAllAdmin(req, res) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 20
    let offset = page * limit - limit
    let products;
    if(!brandId && !typeId){
      products = await Product.findAndCountAll({limit, offset,
        include: [
          { model: Type, required: true},
          {model: Brand}
        ],
        order: [
          ['id', 'ASC'],
        ],
      })
    }
    if (brandId && !typeId) {
      products = await Product.findAndCountAll(
          {
            where:{brandId},
            include: {
              model: {Type, Brand},
              required: true
            },
            limit,
            offset
          }
      )
    }
    if (!brandId && typeId) {
      products = await Product.findAndCountAll({where:{typeId}, limit, offset})
    }
    if (brandId && typeId) {
      products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
    }
    return res.json(products)
  }

  async getProductMove(req, res) {
    const prodMove = await MoveProduct.findAll(
        {
          include: [
            { model: Product, required: true},
            {model: User}
          ],
        }
    )
    return res.json(prodMove)
  }

  async getAllUser(req, res) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 20
    let offset = page * limit - limit
    let products;
    if(!brandId && !typeId){
      products = await Product.findAndCountAll({
        where:{available: true, quantity:{[Op.gt]: 0}},
        limit, offset
      })
    }
    if (brandId && !typeId) {
      products = await Product.findAndCountAll({
        where:{brandId, available: true, quantity:{[Op.gt]: 0}},
        limit, offset})
    }
    if (!brandId && typeId) {
      products = await Product.findAndCountAll(
          {
        where: {typeId, available: true, quantity:{[Op.gt]: 0}
        }
        , limit, offset})
    }
    if (brandId && typeId) {
      products = await Product.findAndCountAll({where:{typeId, brandId, available: true, quantity:{[Op.gt]: 0}}, limit, offset})
    }
    console.log("test")
    let pages = Math.ceil(products.count / limit)
    console.log("PAGES_STARTT_STROKA", pages)
    let pagearray = []
    let i = 0
    let age
    for (i ; pages !== i; i++) {
      age = i + 1
      pagearray.push(age)
    }
    console.log(pagearray)
    products.pages = pagearray
    return res.json(products)
  }
  async getOne(req, res) {
    const {id} = req.params
    const product = await Product.findOne(
      {
        where: {id},
        include: [{model: ProductInfo, as: 'info'}]
      },
    )
    
    return res.json(product)
  }
}

module.exports = new ProductController()