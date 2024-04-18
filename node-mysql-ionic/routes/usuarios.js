const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

router.get("/usuarios", (req, res) => {
  mysqlConnection.query("SELECT * FROM usuarios", (err, result) => {
    if (!err) {
      res.json(result);
    } else {
      res.send(err);
    }
  });
});

router.get("/idUsuario/:correo", (req, res) => {
  const correo = req.params.correo;
  mysqlConnection.query(
    "SELECT id FROM usuarios WHERE email = ?",
    [correo],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.get("/usuarios/:id", (req, res) => {
  const idUsuario = req.params.id;
  mysqlConnection.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [idUsuario],
    (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    }
  );
});

router.post("/usuarios", (req, res) => {
  const { id, nombre, email } = req.body;
  mysqlConnection.query(
    "INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)",
    [id, nombre, email],
    (err, result) => {
      if (!err) {
        res.json({ status: true, message: "Registro correcto." });
      } else {
        res.json({ status: false, message: "Registro incorrecto." });
      }
    }
  );
});

router.post('/login', (req, res) => {
  const {correo, password } = req.body;

  mysqlConnection.query('SELECT * FROM clientes WHERE email = ? AND password = ?',
  [correo, password], (err,result) => {
      if(!err){
          if(result.length > 0){
              res.json({status: true, message: "El usuario si existe",datos: result});
          }else{
              res.json({status: false, message: "El usuario no existe",datos: []}); 
          }
      }else{
          res.json({status: false, message: "Error al consultar el usuario",datos: []});
      }
  });
});

router.post('/loginAdmin', (req, res) => {
  const {correo, password } = req.body;

  mysqlConnection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?',
  [correo, password], (err,result) => {
      if(!err){
          if(result.length > 0){
              res.json({status: true, message: "El usuario si existe",datos: result});
          }else{
              res.json({status: false, message: "El usuario no existe",datos: []}); 
          }
      }else{
          res.json({status: false, message: "Error al consultar el usuario",datos: []});
      }
  });
});

router.get("/reservasUsuario/:id", (req, res) => {
  console.log("hola");
  const idUsuario = req.params.id;
  
  mysqlConnection.query(
    "SELECT DISTINCT r.id AS id_reserva, c.nombre AS nombre, FIRST_VALUE(f.url) OVER (PARTITION BY f.id_alojamiento ORDER BY f.id) AS imagen, a.tipo_propiedad AS tipo, u.ciudad AS ciudad, r.precio_total AS precio, r.fecha_inicio AS fecha_inicio, r.fecha_fin AS fecha_fin FROM reservas r INNER JOIN alojamientos a ON a.id = r.id_alojamiento INNER JOIN caracteristicas c ON c.id_alojamiento = a.id INNER JOIN ubicaciones u ON u.id_alojamiento = a.id INNER JOIN fotos f ON f.id_alojamiento = a.id WHERE r.id_cliente = ?",
    [idUsuario],
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
