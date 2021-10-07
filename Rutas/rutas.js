const express = require("express");
const ruta = express.Router();

let modeloDatos = require("../Modelo/modelo");

ruta.get('/',(req, res) => {
    modeloDatos.find((error, data, next) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });
  
  ruta.post('/registrar',(req, res, next) => {
    modeloDatos.create(req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });
  ruta.get("/edit-student/:id",(req, res) => {
    StudentModel.findById(req.params.id, (error, data, next) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

  ruta.put("/update-student/:id",(req, res, next) => {
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

  ruta.delete("/delete-student/:id",(req, res, next) => {
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
  module.exports = ruta;