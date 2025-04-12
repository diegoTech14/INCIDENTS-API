import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.routes";
import incidentRoutes from "./routes/incidents.routes";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.get('/',(req, res) =>{
  res.send("INCIDENTS API");
});

app.use('/api', usersRouter);
app.use('/api', incidentRoutes);

app.use((req, res, next) =>{
  res.status(404).json({
    message:"Route not found",
    error: true,
    status: 404
  })
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
