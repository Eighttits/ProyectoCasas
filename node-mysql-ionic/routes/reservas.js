const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

router.post("/reservas", (req, res) => {
  const { fechaInicio, fechaFin, total, idCliente, idAlojamiento } = req.body;
  mysqlConnection.query(
    "INSERT INTO reservas (fecha_inicio, fecha_fin, precio_total, id_cliente, id_alojamiento) VALUES (?, ?, ?, ?, ?)",
    [fechaInicio, fechaFin, total, idCliente, idAlojamiento],
    (err, result) => {
      if (!err) {
        res.json({ status: true, message: "Registro correcto." });
      } else {
        res.json({ status: false, message: "Registro incorrecto." });
      }
    }
  );
});

module.exports = router;
