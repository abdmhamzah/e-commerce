'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class User extends Model {}

  User.init({
    name: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name must filled' },
        notNull: { msg: 'Name is required' },
      }
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email must filled' },
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Invalid Email' },
        isUnique(value, next){
          return User.findOne({ where: { email: value } })
            .then(email => {
              if (email) {
                throw new Error(`${value} has been registered`)
              } else {
                next()
              }
            })
        },
      }
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password must filled' },
        notNull: { msg: 'Password is required' },
        min: {
          args: 5,
          msg: 'Minimum Password contain 5 characters'
        }
      }
    },
    role: DataTypes.STRING
  }, 
  {
    hooks: {
      beforeCreate(inst, opt){
        let hash = hashPassword(inst.password)
        inst.password = hash
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: 'Cart' })
  };
  return User;
};