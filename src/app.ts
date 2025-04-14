import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.routes";
import incidentRoutes from "./routes/incidents.routes";
import { PORT } from './config';

const app: Application = express();

app.use(express.json());

app.get('/',(req: Request, res: Response) =>{
  res.send("INCIDENTS API");
});

app.use('/api', usersRouter);
app.use('/api', incidentRoutes);

app.use((req: Request, res: Response, next) =>{
  res.status(404).json({
    message:"Route not found",
    error: true,
    status: 404
  })
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
