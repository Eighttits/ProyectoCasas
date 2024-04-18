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

router.get("/reservas/:id", (req, res) => {
  const idAlojamiento = req.params.id;
  const fechaInicio = req.query.fechaInicio; // Obtener la fecha de inicio de la consulta
  const fechaFin = req.query.fechaFin; // Obtener la fecha de fin de la consulta

  mysqlConnection.query(
    "SELECT id, fecha_inicio, fecha_fin " +
    "FROM reservas " +
    "WHERE id_alojamiento = ? " +
    "AND (" +
    "(fecha_inicio <= ? AND fecha_fin >= ?) " +
    "OR " +
    "(fecha_inicio <= ? AND fecha_fin >= ?) " +
    "OR " +
    "(? <= fecha_inicio AND ? >= fecha_inicio)" +
    ")",
    [idAlojamiento, fechaInicio, fechaInicio, fechaFin, fechaFin, fechaInicio, fechaFin],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});


module.exports = router;
