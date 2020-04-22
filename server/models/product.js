'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class Product extends Model {}

  Product.init({
    name: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Product Name must filled' },
        notNull: { msg: 'Product Name is required' },
      }
    },
    image_url: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Image Product must filled' },
        notNull: { msg: 'Image Product is required' },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Price must be filled' },
        notNull: { msg: 'Price is required' },
        isNumeric: { msg: 'Price must be a number' },
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Stock must be filled' },
        notNull: { msg: 'Stock is required' },
        isNumeric: { msg: 'Stock must be a number' },
        min: {
          args: [0],
          msg: 'Stock must be greater than 0'
        }
      }
    },
    description: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Product Description must filled' },
        notNull: { msg: 'Product Description is required' },
      }
    },
  }, { sequelize });

  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through: 'Cart' })
  };
  return Product;
};