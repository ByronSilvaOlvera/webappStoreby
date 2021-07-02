


module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      keywords: {
        type: Sequelize.STRING
      },

    });
  
    return Category;
  };    