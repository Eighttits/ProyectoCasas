const express = require("express");
const app = express();
const morgan = require("morgan");

//Configuracion del puerto
app.set("port", process.env.PORT || 3000);

//Configuracion de middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST", "PUT", "DELETE", "GET");
    return res.status(200).json({});
  }
  next();
});

//Importar la conexion
app.use("/api/", require("./routes/usuarios"));
app.use("/api/", require("./routes/alojamientos"));

//configuracion para correr el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto ", app.get("port"));
});
