import { incidents } from "@prisma/client";

export interface IIncidentsRepository {
    findAll(): Promise<incidents[]>;
    findById(incident_id: string): Promise<incidents | null>;
    create(incident: incidents): Promise<incidents>
    update(incident_id: string, user: Partial<incidents>): Promise<incidents>;
    delete(incident_id: string): Promise<void>;
}