const {Order, OrderProduct, Product, BasketProduct, User, OrderStatus, MoveProduct} = require('../models/models');



class OrderController {
    async getAllOrder (req, res) {
        const userId = req.user.id;
        const getOrder = await Order.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: OrderProduct,
                required: true,
                include: [{
                    model: Product,
                    required: true
                }]
            },
                {
                    model:OrderStatus,
                }],
            order: [
                ['id', 'ASC'],
            ],
        });
        return res.json(getOrder);
    }

    async getAllOrderAdmin (req, res) {
        const getOrder = await Order.findAll({
            include: [{
                model: OrderProduct,
                required: true,
                include: [{
                    model: Product,
                    required: true
                }]
            },
                {model: User},
                {model: OrderStatus}
            ],
            order: [
                ['id', 'ASC'],
            ],
        });
        return res.json(getOrder);
    }

    async getOrderStatus (req, res) {
        await OrderStatus.findAll()
            .then((response) => {
                return res.json(response)
            })
            .catch(() => {
                return res.json({message: "Ошибка при передаче orderStatus", action: "error"})
            })

    }

    async updateOrderAdmin (req, res) {
        try{
            const objectOrder = await Order.findByPk(req.body.id)
            if(objectOrder.orderStatusId <= 2){
                if (req.body.fio && req.body.deliveryAddress){
                    const updateOrder = await Order.update({fio: req.body.fio, deliveryAddress: req.body.deliveryAddress,phone: req.body.phone, postalCode: req.body.postalCode , orderStatusId: req.body.orderStatusId}, {
                        where: {
                            id: req.body.id
                        }
                    })
                    return res.json({message: "Заказ успешно отредактирован", action: "success"})
                }
                else {
                    return res.json({message: "Поля не могут быть пустыми", action: "error"})
                }
            }
            else{
                if (objectOrder.orderStatusId) {
                    const updateOrder = await Order.update({orderStatusId: req.body.orderStatusId}, {
                        where: {
                            id: req.body.id
                        }
                    })
                    return res.json({message: "Статус заказа успешно изменен", action: "success", log: updateOrder})
                }
            }
        }
        catch (err){
            res.json({message: "Произошла ошибка при изменении заказа"})
        }
    }

    async updateOrder (req, res) {
        try{
            const userId = req.user.id;
            let fio = req.body.fio;
            let address = req.body.address;
            let phone = req.body.phone;
            let index = req.body.index;
            if(fio && address && phone && index){
                const postUpdate = await Order.update({
                    fio: fio,
                    deliveryAddress: address,
                    phone: phone,
                    postalCode: index,
                    orderStatusId: 2
                },{
                    where:{
                        userId: userId,
                        orderStatusId: 1
                    },
                })
                return res.json({message: "Заказ успешно оформлен, проверить статус заказа можно на странице \"Заказы\" "})
            }
        }
        catch (err){
            console.log("Ошибка updateOrder", err)
        }
    }
    async getAllOrderProduct (req, res) {
        try{
            const userId = req.user.id;
            const getOrderProduct = await Order.findAll({
                where:{
                    userId: userId,
                    orderStatusId: 1
                },
                include: [{
                    model: OrderProduct,
                    required: true,
                    include: [{
                        model: Product,
                        required: true
                    }],
                },
                    {model: OrderStatus}],
                order: [
                    ['id', 'ASC'],
                ],


            })
            if(getOrderProduct){
                return res.json({object:getOrderProduct[0], message: "Заполните форму для оформления заказа"})
            }
            if(getOrderProduct.length > 1){
                return res.json({message: "Произошла ошибка. Обратитесь в тех.поддержку"})
            }
            return res.json({message: "У вас нет незаконченного заказа", action: "redirect"})
        }
        catch (err) {
            console.log(err)
            return res.json({message: err, action: "error"})
        }


    }
    async CreateOrder (req, response) {
        const userId = req.user.id;
        const totalPrice = req.body.totalPrice
        let orderId;
        let errors = 0;
        const ChOrderState = await Order.findOne({
            where: {
                userId: userId,
                orderStatusId: 1
            }
        })
        if(ChOrderState) {
            return response.json({message: "У вас остался один незавершенный заказ, продолжить оформление или удалить его?", action: "popup" , orderId: orderId})
        }
        await Order.create({
            price: totalPrice,
            userId: userId,
            orderStatusId: 1
        }).then((res) => {
            orderId = res.dataValues.id

        })
        const basketProductId = req.body.basket;
        for(let i = 0; i < basketProductId.length; i++){
            let item = basketProductId[i]
            if(item.product.available) {
                let prodQuantity;
                let pkProduct = await Product.findByPk(item.product.id)
                if(!pkProduct){
                    errors = ++errors
                }
                if(pkProduct.quantity >= item.product.quantity) {
                    let newQuant = pkProduct.quantity - item.quantity
                    Product.update({
                        quantity: newQuant
                    },{
                        where:{
                            id: pkProduct.id
                        }
                    })
                        .then(() => {
                            const moveProdOrder = MoveProduct.create({
                                action: 6,
                                quantity: item.quantity,
                                userId: req.user.id,
                                productId: pkProduct.id
                            })
                        })
                        .catch(() => {
                            errors = ++errors
                        })
                    console.log("Перед функцией ", orderId)
                    OrderProduct.create({
                        orderId: orderId,
                        quantity: item.quantity,
                        price: item.product.price,
                        productId: item.product.id,
                    })
                        .then((res) => {
                            BasketProduct.destroy({
                                where: {
                                    id: item.id
                                }
                            })
                        })
                        .catch((err) => {
                            response.json({message: err})
                        })
                }
                else{
                    errors = ++errors
                    const incrementProduct = BasketProduct.update({ quantity: pkProduct.quantity}, {
                        where: {
                            id: item.id
                        }
                    })

                    //return  response.json({message: "Данные в коризне изменились", action: "refresh"})
                }
            }
            else{
                errors = ++errors
                const deleteItem = BasketProduct.destroy({
                    where: {
                        id: item.id
                    }
                })
            }
        }
        if(errors > 0) {
            return  response.json({message: "Данные в коризне изменились", action: "refresh"})
        }
        return response.json({message: "Отлично! Теперь заполните форму для оформления заказа", action: "success"})
    }
    async OrderRemove(req, res) {
        try{
            const orderSelect = await Order.findOne({
                where: {
                    userId: req.user.id,
                    orderStatusId: 1
                },
                include: {
                    model: OrderProduct,
                    required: true,
                    include: {
                        model: Product,
                        required: false
                    }
                }
            })
            const orderProduct = orderSelect.order_products
            //console.log("Проверка ",orderProduct)
            orderProduct.forEach(function (item) {
                console.log("Проверка айтема", item.dataValues.quantity)
                const getProduct = Product.update({
                    quantity: item.dataValues.product.quantity + item.dataValues.quantity
                },{
                    where: {
                    id: item.productId
                }
                    }
                )
            })
            const removeOrderProducts = OrderProduct.destroy({
                where: {
                    orderId: orderSelect.id
                }
            })
            console.log("Не работает", orderSelect.order_products[0])
            Order.destroy({
                where: {
                    userId: req.user.id,
                    orderStatusId: 1
                }
            })
                .then(() => {
                    console.log("Заказ удален")
                    return res.json({message: "Заказ удален"})
                })
                .catch((err) => {
                    console.log("Произошла ошибка", err)
                    return res.json({message: err})
                })
        }
        catch (err){
            res.json({message: "Произошла ошибка, обновите страницу"})
            const removeOrderProducts = Order.destroy({
                where: {
                    userId: req.user.id,
                    orderStatusId: 1
                }
            })

        }
    }

}

module.exports = new OrderController()