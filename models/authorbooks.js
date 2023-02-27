'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthorBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthorBooks.init({
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'AuthorBooks',
    tableName: 'author_books',
    timestamps: false
  });
  return AuthorBooks;
};