


module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      zipcode:{
          type : Sequelize.STRING
      },
      city: {
        type : Sequelize.STRING
      },
      country: {
        type : Sequelize.STRING
      }
    });
  
    return Store;
  };    