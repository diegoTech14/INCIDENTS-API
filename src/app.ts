import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.routes";
import incidentRoutes from "./routes/incidents.routes";
import jsonForPosts from "./middlewares/post.middleware";
import { PORT } from './config';

const app: Application = express();

//middleware to allow json object only for POST requests
app.use(jsonForPosts);

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
