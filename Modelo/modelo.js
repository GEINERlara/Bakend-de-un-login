const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let modeloDatos = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
        type: String,
      },
  },
  {
    collection: "Usuarios",
  }
);

module.exports = mongoose.model("modeloDatos", modeloDatos);