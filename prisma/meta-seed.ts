import { incidents, PrismaClient, users } from "@prisma/client"


export class MetaSeed {

    prisma: PrismaClient;

    constructor() {    
        this.prisma = new PrismaClient();
    }

    async generate_seed<T>(model: string, seedbed:T[]): Promise<void>{
        
        const genericModel = this.prisma[model];
        await genericModel.deleteMany();
        try{
            for(let seed of seedbed){
                await genericModel.create({
                    data: seed
                });
            }
            console.log(`Seed ${model} planted 🌱`);
        }catch(error){
            throw new Error("Failed during the seeded ❌");
        }

    } 
}

