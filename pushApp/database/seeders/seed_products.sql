module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('products', [
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('products', null, {})
};
