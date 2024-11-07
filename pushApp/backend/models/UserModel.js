const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('push', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hashedPassword = require('bcrypt').hashSync(value, 10);
          this.setDataValue('password', hashedPassword);
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      hooks: {
        beforeCreate: (user, options) => {}
      }
    });
  }

  static async findByCredentials(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = require('bcrypt').compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    return user;
  }
}

User.init(sequelize);

module.exports = User;