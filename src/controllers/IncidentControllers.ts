import { Request, Response } from "express";
import { IncidentsService } from "../services/IncidentServices";
import { IncidentRepository } from "../repositories/IncidentRepository";


const incidentRepository = new IncidentRepository();
const incidentService = new IncidentsService(incidentRepository);
let incidents = [];

export const IncidentControllers = {

    async getAllIncidents(req: Request, res: Response) {
        incidents = await incidentService.getAllIncident();
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

    async findByUserId(req: Request, res: Response){
        const incidents = await incidentService.findByUserId(req.body.user_dni);
        res.json(incidents);
    },

    async findUserByRiskId(req: Request, res: Response){
        const incidents = await incidentService.findByRiskId(req.body.risk_id);
        res.json(incidents);
    },

    async findByCategoryId(req: Request, res: Response){
        const incidents = await incidentService.findByCategoryId(req.body.category_id);
        res.json(incidents);
    },

    async findByPriorityId(req: Request, res: Response){
        const incidents = await incidentService.findByPriorityId(req.body.priority_id);
        res.json(incidents);
    },

    async findByStatusId(req: Request, res: Response){
        const incidents = await incidentService.findByPriorityId(req.body.status_id);
        res.json(incidents);
    },

    async findByRecordDate(req: Request, res: Response){
        const incidents = await incidentService.findByRecordDate(req.body.record_date);
        res.json(incidents);
    },

};