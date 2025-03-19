import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.routes";
import incidentRoutes from "./routes/incidents.routes";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', usersRouter);
app.use('/api', incidentRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
