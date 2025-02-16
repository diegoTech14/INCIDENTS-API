import { Request, Response } from "express";
import { IncidentsService } from "../services/IncidentServices";
import { IncidentRepository } from "../repositories/IncidentRepository";


const incidentRepository = new IncidentRepository();
const incidentService = new IncidentsService(incidentRepository);

export const IncidentControllers = {

    async getAllIncidents(req: Request, res: Response) {
        const incidents = await incidentService.getAllIncident();
        res.json(incidents);
    },

    async getIncidentById(req: Request, res: Response) {
        const incident_id = "0000001-2024";
        const incident = await incidentService.getIncidentById(incident_id);
        if (incident) {
            res.json(incident);
        } else {
            res.status(404).json({ message: "Incident not found" });
        }
    },

    async createIncident(req: Request, res: Response) {
        const newIncident = await incidentService.createIncident(req.body);
        res.status(201).json(newIncident);
    },

    async updateIncident(req: Request, res: Response) {
        const incident_id = "0000002-2024";
        const updatedIncident = await incidentService.updateIncident(incident_id, req.body);
        res.json(updatedIncident);
    },

    async deleteIncident(req: Request, res: Response) {
        const incident_id = "0000003-2024";
        await incidentService.deleteIncident(incident_id);
        res.status(204).send();
    },

};