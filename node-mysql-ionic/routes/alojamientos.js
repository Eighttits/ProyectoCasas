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

router.get("/alojamientosAdmin/:id", (req, res) => {
  const id = req.params.id; // Obtener el correo del parámetro de la URL
  mysqlConnection.query(
    `SELECT DISTINCT c.nombre AS nombre, a.tipo_propiedad AS tipo, u.ciudad AS ciudad, a.precio_noche AS precio, FIRST_VALUE(f.url) OVER (PARTITION BY f.id_alojamiento ORDER BY f.id) AS imagen FROM alojamientos a INNER JOIN caracteristicas c ON c.id_alojamiento = a.id INNER JOIN fotos f ON f.id_alojamiento = a.id INNER JOIN ubicaciones u ON u.id_alojamiento = a.id WHERE a.id_usuario = ?`,
    [id], // Pasar el correo como parámetro para filtrar los alojamientos
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});



router.post("/alojamientosAdd", (req, res) => {
  const { tipo, direccion, precio_noche, id_usuario } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Consulta SQL para insertar un nuevo alojamiento
  const insertQuery = `
    INSERT INTO alojamientos (tipo_propiedad, direccion, precio_noche, id_usuario)
    VALUES (?, ?, ?, ?)
  `;

  // Ejecutar la consulta con los valores del cuerpo de la solicitud y el id del usuario
  mysqlConnection.query(insertQuery, [tipo, direccion, precio_noche, id_usuario], (err, result) => {
    if (!err) {
      // Responder con el id del nuevo alojamiento insertado
      res.json({ success: true, id: result.insertId });
    } else {
      // Enviar el error si algo salió mal
      res.status(500).send(err);
    }
  });
});

router.post("/alojamientosCar", (req, res) => {
  const { nombre, descripcion, id_alojamiento } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Consulta SQL para insertar un nuevo alojamiento
  const insertQuery = `
    INSERT INTO caracteristicas (nombre, descripcion, id_alojamiento)
    VALUES (?, ?, ?)
  `;

  // Ejecutar la consulta con los valores del cuerpo de la solicitud y el id del usuario
  mysqlConnection.query(insertQuery, [nombre, descripcion, id_alojamiento], (err, result) => {
    if (!err) {
      // Responder con el id del nuevo alojamiento insertado
      res.json({ success: true, id: result.insertId });
    } else {
      // Enviar el error si algo salió mal
      res.status(500).send(err);
    }
  });
});

router.post("/alojamientosUbi", (req, res) => {
  const { pais, estado, ciudad, codigo_postal, id_alojamiento } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Consulta SQL para insertar un nuevo alojamiento
  const insertQuery = `
    INSERT INTO ubicaciones (pais, estado, ciudad, codigo_postal, id_alojamiento)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Ejecutar la consulta con los valores del cuerpo de la solicitud y el id del usuario
  mysqlConnection.query(insertQuery, [pais, estado, ciudad, codigo_postal, id_alojamiento], (err, result) => {
    if (!err) {
      // Responder con el id del nuevo alojamiento insertado
      res.json({ success: true, id: result.insertId });
    } else {
      // Enviar el error si algo salió mal
      res.status(500).send(err);
    }
  });
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
