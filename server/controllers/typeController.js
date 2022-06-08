const {Type, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create (req, res) {
    const {name} = req.body
    await Type.create({name})
        .then(() => {
          return res.json({message: 'Категория успешно добавлен', action: 'success'})
        })
        .catch((err) => {
          return res.json({message: 'Произошла ошибка при добавлении категории', action: 'error', log: err})
        })
  }
  async getAll (req, res) {
    const types = await Type.findAll({
      order: [
        ['id', 'ASC'],
      ],
    })
    return res.json(types)
  }
  async delType (req, res){
    const {id} = req.body
    await Type.destroy({
      where:{id}
    })
        .then(() => {
          return res.json({message: 'Категория успешно удалена', action: 'success'})
        })
        .catch((err) => {
          return res.json({message: 'Произошла ошибка при удалении категории', action: 'error', log: err})
        })
  }
  async changeType (req, res){
    const {id, name} = req.body
    await Type.update({name}, {
          where: {id}
        }
    )
        .then(() => {
          return res.json({message: 'Наименование категории успешно изменено', action: 'success'})
        })
        .catch((err) =>{
          console.log(err)
          return res.json({message: 'Произошла ошибка при изменении наименования категории', action: 'error', log: err})
        })
  }
}

module.exports = new TypeController()