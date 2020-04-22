const { Product } = require('../models')

class ControllerProduct {

    static getProducts(req, res, next){
        Product.findAll({ order: [['id', 'ASC']] })
            .then(products => {
                res.status(200).json({
                    status: 200,
                    message: 'Load Products Success',
                    payload: products
                })
            })
            .catch(next)
    }

    static getProduct(req, res, next){
        const { id } = req.params

        Product.findByPk(id)
            .then(product => {
                if (product) {
                    res.status(200).json({
                        status: 200,
                        message: 'Load Product Success',
                        payload: product
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Product ID not found'
                    })
                }
            })
            .catch(next)
    }

    static createProduct(req, res, next){
        const newProductData = req.body
        Product.create(newProductData)
            .then(newProduct => {
                res.status(201).json({
                    status: 201,
                    message: 'New Product Succesfully Created',
                    payload: newProduct
                })
            })
            .catch(next)
    }

    static updateProduct(req, res, next){
        const { id } = req.params
        const editedProductData = req.body
        console.log('MASUK EDIT');
        
        Product.findByPk(id)
            .then(product => {
                if (!product) {
                    res.status(404).json({
                        status: 404,
                        message: 'Product ID not found'
                    })
                } else {
                    return product.update(editedProductData)
                }
            })
            .then(updatedProduct => {
                res.status(200).json({
                    status: 200,
                    message: 'Product Successfully Updated',
                    payload: updatedProduct
                })
            })
            .catch(next)
    }

    static deleteProduct(req, res, next){
        const { id } = req.params
        let deletedData

        Product.findByPk(id)
            .then(product => {
                if (!product) {
                    res.status(404).json({
                        status: 404,
                        message: 'Product ID not found'
                    })
                } else {
                    deletedData = product
                    return product.destroy()
                }
            })
            .then(() => {
                res.status(200).json({
                    status: 200,
                    message: 'Product Successfully Deleted',
                    payload: deletedData
                })
            })
            .catch(next)
    }

}

module.exports = ControllerProduct