
const dbConfig = require("./config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products   = require("../models/product-model")(sequelize, Sequelize);
db.stores     = require("../models/store-model")(sequelize, Sequelize);
db.categories = require("../models/category-model")(sequelize, Sequelize);

// Una a varias
db.categories.hasMany(db.products);
db.products.belongsTo(db.categories);

db.products.belongsToMany(db.stores,{ through : 'Productstore' } );
db.stores.belongsToMany(db.products,{ through : 'Productstore' });


module.exports = db;