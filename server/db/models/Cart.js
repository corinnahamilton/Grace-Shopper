const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
 
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});


module.exports = Cart;
