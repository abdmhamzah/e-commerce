const router = require('express').Router()

router.get('/', (req, res) => res.send('Hello Products!'))

module.exports = router