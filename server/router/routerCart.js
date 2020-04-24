const router = require('express').Router()
const ControllerCart = require('../controllers/ControllerCart')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ControllerCart.getCart)
router.post('/:id', ControllerCart.createCart)
router.put('/:id', ControllerCart.updateCartToBuy)
router.delete('/:id', ControllerCart.deleteFromCart)
router.delete('/', ControllerCart.checkout)

module.exports = router