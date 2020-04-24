const { Cart, User, Product } = require('../models')

class ControllerCart {

    static getCart(req, res, next){
        Cart.findAll({ 
            where: { UserId: req.UserId },
            include: [{ model: Product }, { model: User }],
            attributes: ['id', 'ProductId', 'UserId', 'qty']
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static createCart(req, res, next){
        const { qty } = req.body || 1
        const productId = Number(req.params.id)
        let curentProduct = null
        Cart.findAll({
            include: [{ model: Product }, { model: User }],
            where: { UserId: req.UserId }
        })
        .then(list_carts => {
            let isListing = false
            for (let i = 0; i < list_carts.length; i++) {
                if (list_carts[i].ProductId == productId) {
                    isListing = true
                    curentProduct = list_carts[i]
                    break
                } 
            }
            if (!isListing) {
                return Promise.all([
                    Cart.create({
                        ProductId: productId,
                        UserId: req.UserId,
                        qty: qty 
                    }),
                    Product.findOne({ where: { id: productId } })
                ]) 
            } else {
                return Cart.update({
                    qty: Number(curentProduct.qty) + 1,
                }, {
                    where: [{ UserId: req.UserId }, { ProductId: productId }],
                })
            }
        })
        .then(newCart => {
            if (newCart[0] == 1) {
                curentProduct.qty++
                res.status(200).json({newCart: curentProduct})
            } else {
                let createdCart = newCart[0]
                let productDetail = newCart[1]
                createdCart.Product = productDetail
                res.status(201).json({newCart: createdCart})
            }
        })
        .catch(next)
    }


    static updateCartToBuy(req, res, next){
        const { qty } = req.body
        const id = Number(req.params.id)
        let data = {
            UserId: req.UserId,
            ProductId: id, 
            qty: qty
        }
        Product.findByPk(id)
            .then(dataProduct => {
                if (dataProduct.stock < qty) {
                    res.status(400).json({
                        message: 'Product out of stock'
                    })
                } else {
                    return Product.update({ 
                        stock: dataProduct.stock - qty 
                    },{ 
                        where: { id: id }
                    })
                }
            })
            .then(() => {
                return Cart.create(data)
            })
            .then(newCart => {
                return Cart.findAll({ 
                    include: Product,
                    where: { id: newCart.id } 
                })
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static checkout(req, res, next){
        Cart.findAll({
            where: { UserId: req.UserId },
            include: [{ model: User }, { model: Product }],
            attributes: ['id', 'ProductId', 'UserId', 'qty']
        })
            .then(checkoutCart => {
                let updatedProduct = []
                checkoutCart.forEach(el => {
                    let sisa = el.Product.stock - el.qty
                    updatedProduct.push(Product.update({
                        stock: sisa,
                    }, {
                        where: { id: el.Product.id }
                    }))
                });
                return Promise.all(updatedProduct)
            })
            .then(() => {
                return Cart.destroy({
                    where: { UserId: req.UserId  },
                })
            })
            .then(() => {
                res.status(200).json({
                    message: 'Cart has been deleted'
                })
            })
            .catch(next)

    }

    static deleteFromCart(req, res, next){
        const { id } = Number(req.params.id)
        console.log(id, 'ID masuk controller')
        // Cart.destroy({ where: { id: id } })
        //     .then(deleted => {
        //         res.status(200).json({
        //             message: 'Item in Cart has been deleted'
        //         })
        //     })
        //     .catch(next)
    }
}

module.exports = ControllerCart