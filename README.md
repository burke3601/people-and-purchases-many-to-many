# People purchasing items!


## tables

- Persons
    - name

- Items
    - name

- Purchases
    - personID
    - itemID

## Database speak

- a person has many purchases
- purchases belong to many persons 
- an item has many purchases
- purchases belong to many items

## Sequelize calls

Setting up the models

```sh
npx sequelize model:generate --name Person --attributes name:string
npx sequelize model:generate --name Item --attributes name:string
npx sequelize model:generate --name Purchase --attributes 'personID:integer, itemID:integer'

```

## How to handle Sequelize's automatic pluralization?
 or: "when do I say People and when do I say Person?"

 - use `Person` in any code file that is not a migration
 - use `People` in Beekeeper or in a migration file.

## Set up foreign keys and associations in our Junction Table

Two steps for this:
1. Modify the `Purchase.init()` to tell Sequelize what tables the Foreign Keys _reference_.
2. Add function calls to the `associate()` function.
    - `Purchase.belongsTo(Person)`
    - `Purchase.belongsTo(Item)`

### Modify `Purchase.init()`

for each FK:
- change the value to an object
- gave it a `type` property
- gave it a `references` property

```js
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
  ```
### 2. Add association calls inside the `associate()` function

```js
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
```