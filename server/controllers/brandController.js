const {Brand} = require('../models/models');

class BrandController {
  async create (req, res) {
    const {name} = req.body
    await Brand.create({name})
        .then(() => {
            return res.json({message: 'Производитель успешно добавлен', action: 'success'})
        })
        .catch((err) => {
            return res.json({message: 'Произошла ошибка при добавлении производителя', action: 'error', log: err})
        })
  }
  async getAll (req, res) {
    const brands = await Brand.findAll({
        order: [
            ['id', 'ASC'],
        ],
    })
    return res.json(brands)
  }
  async delBrand (req, res){
      const {id} = req.body
      await Brand.destroy({
          where:{id}
      })
          .then(() => {
              return res.json({message: 'Производитель успешно удален', action: 'success'})
          })
          .catch((err) => {
              return res.json({message: 'Произошла ошибка при удалении производителя', action: 'error', log: err})
          })
  }

  async changeBrand (req, res) {
    const {id, name} = req.body
    await Brand.update({name}, {
          where: {id}
    }
    )
        .then(() => {
          return res.json({message: 'Наименование производителя успешно изменено', action: 'success'})
        })
        .catch((err) =>{
            console.log(err)
          return res.json({message: 'Произошла ошибка при изменении наименования производителя', action: 'error', log: err})
        })
  }
}

module.exports = new BrandController();