const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let modeloDatos = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      min: 4,
      max: 12435,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
  },
  {
    collection: "Usuarios",
  }
);

module.exports = mongoose.model("modeloDatos", modeloDatos);
