const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const routerUser = require('./routerUser')
const routerProduct = require('./routerProduct')
const routerCart = require('./routerCart')

router.get('/', (req, res) => res.send('Hello World!'))
router.use('/users', routerUser)
router.use('/products', routerProduct)
router.use('/carts', routerCart)
router.use(errorHandler)

module.exports = router