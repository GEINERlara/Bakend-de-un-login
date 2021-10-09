const ruta = require("express").Router();

ruta.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "mi ruta protegida",
      user: req.user,
    },
  });
});

module.exports = ruta;
