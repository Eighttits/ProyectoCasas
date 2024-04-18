const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

router.get("/alojamientos", (req, res) => {
  mysqlConnection.query(
    "SELECT DISTINCT a.id AS id_alojamiento, c.nombre AS nombre, a.tipo_propiedad AS tipo, u.ciudad AS ciudad, a.precio_noche AS precio, FIRST_VALUE(f.url) OVER (PARTITION BY f.id_alojamiento ORDER BY f.id) AS imagen FROM alojamientos a INNER JOIN caracteristicas c ON c.id_alojamiento = a.id INNER JOIN fotos f ON f.id_alojamiento = a.id INNER JOIN ubicaciones u ON u.id_alojamiento = a.id",
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.get("/alojamientos/:id", (req, res) => {
  const idAlojamiento = req.params.id;
  mysqlConnection.query(
    "SELECT DISTINCT a.id AS id_alojamiento, c.nombre AS nombre, a.tipo_propiedad AS tipo, u.ciudad AS ciudad, a.precio_noche AS precio, FIRST_VALUE(f.url) OVER (PARTITION BY f.id_alojamiento ORDER BY f.id) AS imagen, c.descripcion AS descripcion FROM alojamientos a INNER JOIN caracteristicas c ON c.id_alojamiento = a.id INNER JOIN fotos f ON f.id_alojamiento = a.id INNER JOIN ubicaciones u ON u.id_alojamiento = a.id WHERE a.id = ?",
    [idAlojamiento],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.get("/servicios/:id", (req, res) => {
  const idServicio = req.params.id;
  mysqlConnection.query(
    "SELECT s.nombre AS servicio FROM alojamiento_servicios a INNER JOIN servicios s ON s.id = a.id_servicio WHERE a.id_alojamiento = ?",
    [idServicio],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.get("/alojamientos/:correo", (req, res) => {
  const correo = req.params.correo; // Obtener el correo del parámetro de la URL
  mysqlConnection.query(
    `SELECT DISTINCT c.nombre AS nombre, a.tipo_propiedad AS tipo, u.ciudad AS ciudad, a.precio_noche AS precio, FIRST_VALUE(f.url) OVER (PARTITION BY f.id_alojamiento ORDER BY f.id) AS imagen FROM alojamientos a INNER JOIN caracteristicas c ON c.id_alojamiento = a.id INNER JOIN fotos f ON f.id_alojamiento = a.id INNER JOIN ubicaciones u ON u.id_alojamiento = a.id INNER JOIN usuarios us ON a.id_usuario = us.id WHERE us.email = ?`,
    [correo], // Pasar el correo como parámetro para filtrar los alojamientos
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res
          .status(500)
          .json({ error: "Error al obtener alojamientos", message: err });
      }
    }
  );
});

router.get("/calificaciones/:id", (req, res) => {
  const idAlojamiento = req.params.id;
  mysqlConnection.query(
    "SELECT AVG(c.calificacion) AS promedio, COUNT(c.calificacion) AS total FROM comentarios c WHERE c.id_alojamiento = ?",
    [idAlojamiento],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.get("/comentarios/:id", (req, res) => {
  const idAlojamiento = req.params.id;
  mysqlConnection.query(
    "SELECT cl.nombre AS nombre, c.comentario AS comentario, c.calificacion AS calificacion FROM comentarios c INNER JOIN clientes cl ON cl.id = c.id_cliente WHERE c.id_alojamiento = ?",
    [idAlojamiento],
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
