import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
  res.send("¡Bienvenido a la API con TypeScript y Express!");
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
