



module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      color: {
        type: Sequelize.STRING
      },
      // category: {
      //   type: Sequelize.INTEGER
      //   // references:{
      //   //   model: Category,
      //   //   key  : 'id',
      //   // }
      // },
      size:{
          type : Sequelize.STRING
      },
      price: {
          type : Sequelize.DECIMAL(10,2)
      },
    });
  
    return Product;
  };    