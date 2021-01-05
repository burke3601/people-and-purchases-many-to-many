'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //use models.Persn instead of doing a 
      //require('./person),
      // this avoids "circular imports"
      Purchase.belongsTo(models.Person, {
        foreignKey: 'personId'
      });
      Purchase.belongsTo(models.Item, {
        foreignKey: 'itemId'
      })
    }
  };
  Purchase.init({
    personID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Person',
        key: 'id'
      }
    },
    itemID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Person',
        key: 'id'
      }
    }

  
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};