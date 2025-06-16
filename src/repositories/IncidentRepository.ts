import { PrismaClient, incidents } from "@prisma/client";
import { IIncidentsRepository } from "./IIncidentsRepository";
import { Incident } from "../interfaces/incidentsInterface";

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

      async findByUserId(user_dni: string): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{user_dni:user_dni},
        });
      }

      async findByRiskId(risk_id: number): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{
            risk_id:risk_id
          }
        })
      }

      async findByCategoryId(category_id: number): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{
            category_id:category_id
          }
        })
      }
      
     async findByPriorityId(priority_id: number): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{
            priority_id:priority_id
          }
        })
     }
     
     async findByStatusId(status_id: number): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{
            status_id:status_id
          }
        })
     }

     async findByRecordDate(record_date: Date): Promise<incidents[] | null> {
        return prisma.incidents.findMany({
          where:{
            record_date:record_date
          }
        })  
     }
}