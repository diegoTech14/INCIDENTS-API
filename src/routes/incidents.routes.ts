import { Router } from "express";
import { IncidentControllers } from "../controllers/IncidentControllers";

const incidentRoutes = Router();

incidentRoutes.get("/incidents", IncidentControllers.getAllIncidents);
incidentRoutes.get("/incidents/:id", IncidentControllers.getIncidentById);
incidentRoutes.post("/incidents", IncidentControllers.createIncident);
incidentRoutes.put("/incidents/:id", IncidentControllers.updateIncident);
incidentRoutes.delete("/incidents/:id", IncidentControllers.deleteIncident);

export default incidentRoutes;