const {Order, OrderProduct, Product, BasketProduct, User} = require('../models/models');



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
            }],
            order: [
                ['id', 'ASC'],
            ],
        });
        return res.json(getOrder);
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
                    status: 1
                },{
                    where:{
                        userId: userId,
                        status: "0"
                    }
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
                    status: 0
                },
                include: [{
                    model: OrderProduct,
                    required: true,
                    include: [{
                        model: Product,
                        required: true
                    }],
                }],
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
                status: 0
            }
        })
        if(ChOrderState) {
            return response.json({message: "У вас остался один незавершенный заказ, продолжить оформление или удалить его?", action: "popup" , orderId: orderId})
        }
        await Order.create({
            price: totalPrice,
            userId: userId,
            status: 0
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
                    status: 0
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
                    status: 0
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
            // const orderSelect = await Order.findOne({
            //     where: {
            //         userId: req.user.id,
            //         status: 0
            //     },
            //
            // })
            const removeOrderProducts = Order.destroy({
                where: {
                    userId: req.user.id,
                    status: 0
                }
            })

        }
    }

}

module.exports = new OrderController()