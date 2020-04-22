const router = require('express').Router()
const ControllerProduct = require('../controllers/ControllerProduct')
const authentication = require('../middlewares/authentication')

router.get('/', ControllerProduct.getProducts)
router.get('/:id', ControllerProduct.getProduct)

router.use(authentication)

router.post('/', ControllerProduct.createProduct)
router.put('/:id', ControllerProduct.updateProduct)
router.delete('/:id', ControllerProduct.deleteProduct)


module.exports = router