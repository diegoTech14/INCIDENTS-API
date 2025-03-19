import { IncidentRepository } from "../repositories/IncidentRepository";
import { incidents } from "@prisma/client";

export class IncidentsService {

    constructor(private incidentRepository: IncidentRepository) { }

    async getAllIncident(): Promise<incidents[]> {
        return this.incidentRepository.findAll();
    }

    async getIncidentById(incident_id: string): Promise<incidents | null> {
        return this.incidentRepository.findById(incident_id);
    }

    async createIncident(incident: incidents): Promise<incidents> {
        return this.incidentRepository.create(incident);
    }

    async updateIncident(incident_id: string, incident: Partial<incidents>): Promise<incidents> {
        return this.incidentRepository.update(incident_id, incident);
    }

    async deleteIncident(incident_id: string): Promise<void> {
        return this.incidentRepository.delete(incident_id);
    }

}