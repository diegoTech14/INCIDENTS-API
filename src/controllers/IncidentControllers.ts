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
        const incident = await incidentService.getIncidentById(req.params.id);
        (incident) ? res.json(incident) : res.status(404).json({ message: "Incident not found" })
    },

    async createIncident(req: Request, res: Response) {
        const newIncident = await incidentService.createIncident(req.body);
        res.status(201).json(newIncident);
    },

    async updateIncident(req: Request, res: Response) {
        const updatedIncident = await incidentService.updateIncident(req.params.id, req.body);
        (updatedIncident) ? res.json(updatedIncident) : res.status(404).json({ message: "Incident not found" })
    },

    async deleteIncident(req: Request, res: Response) {
        const deletedIncident = await incidentService.deleteIncident(req.params.id);
        (deletedIncident) ? res.json(deletedIncident) : res.status(404).json({ message: "Incident not found" })
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