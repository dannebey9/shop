const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo, Type, Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, available, quantity } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          }))
      }

      const product = await Product.create({ name, price, brandId, typeId, info, available, quantity, img: fileName })

      return res.json(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
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
        include: {
          model: Type,
          required: true
        },
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

  async getAllUser(req, res) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 20
    let offset = page * limit - limit
    let products;
    if(!brandId && !typeId){
      products = await Product.findAndCountAll({
        where:{available: true, quantity:{[Op.gt]: 0}
        }
        ,limit, offset
      })
    }
    if (brandId && !typeId) {
      products = await Product.findAndCountAll({where:{brandId, available: true, quantity:{[Op.gt]: 0}}, limit, offset})
    }
    if (!brandId && typeId) {
      products = await Product.findAndCountAll({where:{typeId, available: true, quantity:{[Op.gt]: 0}}, limit, offset})
    }
    if (brandId && typeId) {
      products = await Product.findAndCountAll({where:{typeId, brandId, available: true, quantity:{[Op.gt]: 0}}, limit, offset})
    }
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