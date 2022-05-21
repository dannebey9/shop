const {BasketProduct, Product, Basket, ProductInfo} = require('../models/models');
const Console = require("console");
const {raw} = require("express");
//const Console = require("console");

class BasketProductController {
    async getAll (req, res){
        const basketId = req.user.bId
        const baProd = await BasketProduct.findAll({
            include: [{
                model: Product,
                required: true
            }],
            where: {
                basketId
            }
        })
        return res.json(baProd);
    }
    async decrementItem_old (req, res) {
        try{
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                where: {
                    basketId: bId, productId: productId
                }
            });
            if(Object.values(getProductInBasket).length > 0){
                let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
                if (nodeData[0].quantity < 2){
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                    return res.json({message: "Товар удален из корзины"})
                }
                else{
                    const decrementProduct = BasketProduct.update({ quantity: --nodeData[0].quantity}, {
                        where: {
                            id: nodeData[0].id
                        }
                    })
                    return res.json({message: "Кол-во в коризне уменьшено: "  + nodeData[0].quantity})
                }
            }
            else {
                //const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                return res.json({message: "Товар отсутствует в корзине"})
            }
        }
        catch (err){
            return res.json({message: "Ошибка изменеия кол-ва товара"})
        }
    }
    async delItem (req, res){
        try{
            const {bId} = req.user;
            const {productId} = req.body;
            const getProductInBasket = await BasketProduct.findAll({
                where: {
                    basketId: bId, productId: productId
                }
            });
            if(Object.values(getProductInBasket).length > 0){
                let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
                const deleteItem = BasketProduct.destroy({
                    where: {
                        id: nodeData[0].id
                    }
                })
                return res.json({message: "Товар удален из корзины"})
            }
            else {
                return res.json({message: "Товар отсутствует в корзине"})
            }
        }
        catch (err){
            return res.json({message: "Ошибка изменеия кол-ва товара"})
        }

    }


    async decrementItem (req, res) {
        try{
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
            if (product.available){
                if(Object.values(getProductInBasket).length > 0){
                    let newQuantity = --nodeData[0].quantity;
                     if (nodeData[0].quantity > nodeData[0].product.quantity) {

                        return res.json({message: "Кол-во доступного товара изменилось"})
                    }
                    else {
                         if (nodeData[0].quantity === 0){
                             const deleteItem = BasketProduct.destroy({
                                 where: {
                                     id: nodeData[0].id
                                 }
                             })
                             return res.json({message: "Товар удален из корзины"})
                         }
                         else
                         {
                             const decrementProduct = BasketProduct.update({ quantity: newQuantity}, {
                                 where: {
                                     id: nodeData[0].id
                                 }
                             })
                             return res.json({message: "Кол-во в коризне уменьшено: "  + nodeData[0].quantity})
                         }
                    }
                }
                else{
                    //const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                    return res.json({message: "Товар отсутствует в корзине"})
                }
            }
            else{
                if(Object.values(getProductInBasket).length > 0) {
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                }
                return res.json({message: "Товар недоступен"})
            }
        }
        catch (err){
            return err
        }
    }





    async addProduct (req, res) {
        try{
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
            if (product.available){
                if(Object.values(getProductInBasket).length > 0){
                    let newQuantity = ++nodeData[0].quantity;
                    if(newQuantity > nodeData[0].product.quantity){
                        return res.json({message: "Вы добавили максимальное кол-во товара"})
                    } else if (nodeData[0].quantity > nodeData[0].product.quantity) {
                        return res.json({message: "Кол-во доступного товара изменилось"})
                    }
                    else {
                        const incrementProduct = BasketProduct.update({ quantity: newQuantity}, {
                            where: {
                                id: nodeData[0].id
                            }
                        })
                        return res.json({message: "Кол-во в коризне увеличено: "  + nodeData[0].quantity})
                    }
                }
                else{
                    const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
                    return res.json({message: "Товар добавлен в корзину"})
                }
            }
            else{
                if(Object.values(getProductInBasket).length > 0) {
                    const deleteItem = BasketProduct.destroy({
                        where: {
                            id: nodeData[0].id
                        }
                    })
                }
                return res.json({message: "Товар недоступен"})
            }
        }
        catch (err){
            return err
        }
    }

    // async addProduct_old (req, res) {
    //     try{
    //         const {bId} = req.user;
    //         const {productId} = req.body;
    //         const getProductInBasket = await BasketProduct.findAll({
    //             include: [{
    //                 model: Product,
    //                 required: true
    //             }],
    //             where: {
    //                 basketId: bId, productId: productId
    //             }
    //         });
    //         if(Object.values(getProductInBasket).length > 0){
    //             let nodeData = JSON.parse(JSON.stringify(getProductInBasket))
    //             let newQuantity = ++nodeData[0].quantity;
    //             if(newQuantity > nodeData[0].product.quantity){
    //                 return res.json({message: "Вы добавили максимальное кол-во товара"})
    //             } else if (nodeData[0].quantity > nodeData[0].product.quantity) {
    //                 return res.json({message: "Кол-во доступного товара изменилось"})
    //             } else if (!nodeData[0].product.available){
    //                 const deleteItem = BasketProduct.destroy({
    //                     where: {
    //                         id: nodeData[0].id
    //                     }
    //                 })
    //                 return res.json({message: "Товар не доступен к продаже"})
    //             } else{
    //                 const incrementProduct = BasketProduct.update({ quantity: newQuantity}, {
    //                     where: {
    //                         id: nodeData[0].id
    //                     }
    //                 })
    //                 return res.json({message: "Кол-во в коризне увеличено: "  + nodeData[0].quantity})
    //             }
    //         }
    //         else {
    //             const resBasketProduct = BasketProduct.create({quantity: 1, basketId: bId, productId: productId})
    //             return res.json({message: "Товар добавлен в корзину"})
    //         }
    //     }
    //     catch (err){
    //         return err
    //     }
    //
    // }
}

module.exports = new BasketProductController();