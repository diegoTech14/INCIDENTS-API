import { PrismaClient, incidents } from "@prisma/client";
import { IIncidentsRepository } from "./IIncidentsRepository";

const prisma = new PrismaClient();

export class IncidentRepository implements IIncidentsRepository{
    async findAll(): Promise<incidents[]> {
        return prisma.incidents.findMany();
      }
    
      async findById(incident_id: string): Promise<incidents | null> {
        return prisma.incidents.findUnique({ where: { incident_id } });
      }
    
      async create(incident: incidents): Promise<incidents> {
        return prisma.incidents.create({ data: incident });
      }
    
      async update(incident_id: string, incident: Partial<incidents>): Promise<incidents> {
        return prisma.incidents.update({ where: { incident_id }, data: incident });
      }
    
      async delete(incident_id: string): Promise<void> {
        await prisma.incidents.delete({ where: { incident_id } });
      }
}