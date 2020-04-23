'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const devProduct = [
      {
        name: 'Iphone 11',
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-select-2019-family?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1567812930312',
        price: 20000000,
        stock: 10,
        description: 'New Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Macbook Pro 16',
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207',
        price: 35000000,
        stock: 10,
        description: 'New Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ipad Pro',
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202003?wid=890&amp;hei=1100&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1583430767182',
        price: 25000000,
        stock: 10,
        description: 'New Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imac Pro',
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imacpro-27-retina-selection-hero?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1511982294002',
        price: 40000000,
        stock: 10,
        description: 'New Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NEW! Iphone SE',
        image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-family-select-2020?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1586794486444',
        price: 16000000,
        stock: 10,
        description: 'New Product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    return queryInterface.bulkInsert('Products', devProduct, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
