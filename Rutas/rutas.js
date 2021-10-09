const express = require("express");
const ruta = express.Router();
const bcrypt = require("bcrypt");

let modeloDatos = require("../Modelo/modelo");

ruta.get("/", (req, res) => {
  modeloDatos.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
// @hapi/joi;jsonwebtoken;npm i bcrypt
ruta.post("/registrar", async (req, res, next) => {
  const emailExiste = await modeloDatos.findOne({ email: req.body.email });
  if (emailExiste) {
    return res.status(400).json("el usuario ya esta registrado");
  }

  // const encryp = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, 10);

  const user = new modeloDatos({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: password,
  });

  modeloDatos.create(user, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
ruta.get("/edit-student/:id", (req, res) => {
  StudentModel.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.put("/update-student/:id", (req, res, next) => {
  StudentModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});

ruta.delete("/delete-student/:id", (req, res, next) => {
  StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
const jwt = require("jsonwebtoken");
ruta.post("/login", async (req, res) => {
  const user = await modeloDatos.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("Ususario no esta registrado");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      error: "Contraseña invalida",
    });
  }
  /*  res.json({
    error: null,
    data: "Acceso exitoso",
  }); */
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    "claveSecreta1"
  );
  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});
module.exports = ruta;
