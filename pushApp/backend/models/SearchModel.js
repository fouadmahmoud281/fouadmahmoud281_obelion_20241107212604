const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('push', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Search extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      query: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      suggestion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Search',
      tableName: 'searches',
      timestamps: false,
    });
  }
}

Search.init(sequelize);

module.exports = Search;