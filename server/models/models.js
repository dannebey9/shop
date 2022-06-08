const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
})

const UserRole = sequelize.define('user_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, allowNull: false},
})
const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
})

const MoveProduct = sequelize.define('move_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    action: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: true}
})

const OrderStatus = sequelize.define('order_status', {
    id: {type: DataTypes.INTEGER, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false}
})


const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    deliveryAddress: {type: DataTypes.STRING, allowNull: true},
    fio: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.STRING, allowNull: true},
    postalCode: {type: DataTypes.INTEGER, allowNull: true}
})
const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    price: {type: DataTypes.INTEGER, allowNull: false}
})

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.FLOAT, allowNull: false},
  rating: {type: DataTypes.STRING, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: true},
  available: {type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false},
  quantity: {type: DataTypes.INTEGER, allowNull: false}
})
const Type = sequelize.define('type',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Brand = sequelize.define('brand',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const ProductInfo = sequelize.define('product_info',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//User.hasOne(Basket)
//Basket.belongsTo(User)

User.hasOne(MoveProduct)
MoveProduct.belongsTo(User)

Product.hasOne(MoveProduct)
MoveProduct.belongsTo(Product)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)


Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

OrderStatus.hasMany(Order)
Order.belongsTo(OrderStatus)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

UserRole.hasMany(User)
User.belongsTo(UserRole, {
    foreignKey: {
        allowNull: false,
        defaultValue: 1
    }
})

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

    OrderStatus.bulkCreate([
        {id: 1, name: "Оформляется"},
        {id: 2, name: "Обрабатывается магазином"},
        {id: 3, name: "Передан перевозчику"},
        {id: 4, name: "Выполнен"},
        {id: 5, name: "Возврат"}
    ]).then(() => {
        console.log("Успешно")
    }).catch((err) =>{
        console.log("Ошибка", err)
    })

module.exports = {
  User,
   Basket,
   BasketProduct,
   Product,
   Type,
   Brand,
   TypeBrand,
   ProductInfo,
    Order,
    OrderProduct,
    MoveProduct,
    OrderStatus,
    UserRole
}