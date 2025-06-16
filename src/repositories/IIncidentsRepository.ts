import { incidents } from "@prisma/client";

export interface IIncidentsRepository {
    findAll(): Promise<incidents[]>;
    findById(incident_id: string): Promise<incidents | null>;
    create(Incident: incidents): Promise<incidents>
    update(incident_id: string, user: Partial<incidents>): Promise<incidents>;
    delete(incident_id: string): Promise<void>;
    findByUserId(user_dni: string): Promise<incidents[] | null>;
    findByRiskId(risk_id:number): Promise<incidents[] | null>;
    findByCategoryId(category_id:number): Promise<incidents[] | null>;
    findByPriorityId(priority_id:number):Promise<incidents[] | null>;
    findByStatusId(status_id:number): Promise<incidents[] | null>;
    findByRecordDate(record_date:Date): Promise<incidents[] | null>;
}