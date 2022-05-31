const {BasketProduct, Product, Basket, ProductInfo} = require('../models/models');

const {Op} = require("sequelize");
//const Console = require("console");

class BasketProductController {
    async getAll(req, res) {
        const basketId = req.user.bId
        const baProd = await BasketProduct.findAll({
            include: [{
                model: Product,
                required: true
            }],
            where: {
                basketId
            },
            order: [
                ['id', 'ASC'],
            ],

        })

        baProd.forEach((item) => {
            if(item.product.available === true || item.product.quantity > 0){
            }
            else{
                const deleteItem = BasketProduct.destroy({
                    where: {
                        id: item.id
                    }
                })
            }
        })
        const basketReturn = await BasketProduct.findAll({
            include: [{
                model: Product,
                required: true
            }],
            where: {
                basketId
            },
            order: [
                ['id', 'ASC'],
            ],

        })
        return res.json(basketReturn)
    }

    async decrementItem_old(req, res) {
        try {
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                where: {
                    basketId: bId, productId: productId
                }
            });
            if (Object.values(getProductInBasket).length > 0) {
                let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
                if (nodeData[0].quantity < 2) {
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                    return res.json({message: "Товар удален из корзины"})
                } else {
                    const decrementProduct = BasketProduct.update({quantity: --nodeData[0].quantity}, {
                        where: {
                            id: nodeData[0].id
                        }
                    })
                    return res.json({message: "Кол-во в коризне уменьшено: " + nodeData[0].quantity})
                }
            } else {
                //const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                return res.json({message: "Товар отсутствует в корзине"})
            }
        } catch (err) {
            return res.json({message: "Ошибка изменеия кол-ва товара"})
        }
    }

    async delItem(req, res) {
        try {
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                where: {
                    basketId: bId, productId: productId
                }
            });
            if (Object.values(getProductInBasket).length > 0) {
                let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
                const deleteItem = BasketProduct.destroy({
                    where: {
                        id: nodeData[0].id
                    }
                })
                return res.json({message: "Товар удален из корзины"})
            } else {
                return res.json({message: "Товар отсутствует в корзине"})
            }
        } catch (err) {
            return res.json({message: "Ошибка изменеия кол-ва товара"})
        }

    }


    async decrementItem(req, res) {
        try {
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                include: [{
                    model: Product,
                    required: true
                }],
                where: {
                    basketId: bId, productId: productId
                }
            });
            const product = await Product.findOne(
                {
                    where: {id: productId},
                },
            )
            let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
            if (product.available) {
                if (Object.values(getProductInBasket).length > 0) {
                    let newQuantity = --nodeData[0].quantity;
                    if (nodeData[0].quantity > nodeData[0].product.quantity) {

                        return res.json({message: "Кол-во доступного товара изменилось"})
                    } else {
                        if (nodeData[0].quantity === 0) {
                            const deleteItem = BasketProduct.destroy({
                                where: {
                                    id: nodeData[0].id
                                }
                            })
                            return res.json({message: "Товар удален из корзины"})
                        } else {
                            const decrementProduct = BasketProduct.update({quantity: newQuantity}, {
                                where: {
                                    id: nodeData[0].id
                                }
                            })
                            return res.json({message: "Кол-во в коризне уменьшено: " + nodeData[0].quantity})
                        }
                    }
                } else {
                    //const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                    return res.json({message: "Товар отсутствует в корзине"})
                }
            } else {
                if (Object.values(getProductInBasket).length > 0) {
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                }
                return res.json({message: "Товар недоступен"})
            }
        } catch (err) {
            return err
        }
    }

    async addProduct(req, res) {
        try {
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                include: [{
                    model: Product,
                    required: true
                }],
                where: {
                    basketId: bId, productId: productId
                }
            });
            const product = await Product.findOne(
                {
                    where: {id: productId},
                },
            )
            if(!product){
                return res.json({message:"Товар не доступен"})
            }
            let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
            if (product.available) {
                if (Object.values(getProductInBasket).length > 0) {
                    let newQuantity = ++nodeData[0].quantity;
                    if (newQuantity > nodeData[0].product.quantity) {
                        return res.json({message: "Вы добавили максимальное кол-во товара"})
                    } else if (nodeData[0].quantity > nodeData[0].product.quantity) {
                        return res.json({message: "Кол-во доступного товара изменилось"})
                    } else {
                        const incrementProduct = BasketProduct.update({quantity: newQuantity}, {
                            where: {
                                id: nodeData[0].id
                            }
                        })
                        return res.json({message: "Кол-во в коризне увеличено: " + nodeData[0].quantity})
                    }
                } else {
                    const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                    return res.json({message: "Товар добавлен в корзину"})
                }
            } else {
                if (Object.values(getProductInBasket).length > 0) {
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                }
                return res.json({message: "Товар недоступен"})
            }
        } catch (err) {
            return res.json({message: "Произошла ошибка, перезагрузите страницу"})
        }
    }

}

module.exports = new BasketProductController();