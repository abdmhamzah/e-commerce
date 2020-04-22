const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class ControllerUser {

    static signup(req, res, next){
        if (!req.body.role) {
            req.body.role = 'user'
        }
        const { name, email, password, role } = req.body
        const newUserData = {
            name: name,
            email: email,
            password: password,
            role: role
        }
        User.create(newUserData)
            .then(newUser => {
                res.status(201).json({
                    status: 201,
                    message: 'Sign Up User Successfull',
                    payload: newUser
                })
            })
            .catch(next)
    }

    static signin(req, res, next){
        const { email, password } = req.body
        User.findOne({ where: { email: email } })
            .then(user => {
                if(!user){
                    res.status(404).json({
                        status: 404,
                        message: 'User not found'
                    })
                } else {
                    if (checkPassword(password, user.password)) {
                        const token = jwt.sign({
                            UserId: user.id,
                            email: user.email
                        }, process.env.JWT_SECRET)
                        // console.log(user)
                        res.status(200).json({
                            status: 200,
                            message: 'Sign In User Successfull',
                            payload: {
                                token: token,
                                email: user.email,
                                role: user.role
                            }
                        })
                    } else {
                        res.status(400).json({
                            status: 400,
                            message: 'Invalid Email / Password'
                        })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = ControllerUser