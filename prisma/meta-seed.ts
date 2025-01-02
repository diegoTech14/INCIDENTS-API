import { incidents, PrismaClient, users } from "@prisma/client"


export class MetaSeed {

    prisma: PrismaClient;

    constructor() {    
        this.prisma = new PrismaClient();
    }

    async first_user():Promise<users | null>{
        try{
            return await this.prisma.users.findFirst();
        }catch(error){
            throw new Error('Failed to fetch the first user');
        }
    }

    async first_incident(): Promise <incidents | null>{
        try{
            return await this.prisma.incidents.findFirst();
        }catch(error){
            throw new Error("Failet to fetch the first incident");
        }
    }

    async generate_seed<T>(model: string, seedbed:T[]): Promise<void>{
        
        const genericModel = this.prisma[model];
        await genericModel.deleteMany();
        console.table(seedbed);
        for(let seed of seedbed){
            await genericModel.create({
                data: seed
            });
        }
    } 
}

