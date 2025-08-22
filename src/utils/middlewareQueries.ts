import { PrismaClient, roles } from "@prisma/client";
import { roleRoute } from "../interfaces/userInterfaces";
const prisma = new PrismaClient();

export class MiddlewareQueries {

    private pattern = /^[a-z0-9]{3,8}-[a-z0-9]{2,6}$/i
    private api = "api";

    routeComparator(route: string): string {
        const routeSegments = route.split('/').filter(Boolean);
        let response = "";

        // I should to improve it to support incidents
        if (routeSegments[0] === 'api') {
            
            if (routeSegments.length >= 3 && routeSegments[1] === 'users' && routeSegments[2].match(this.pattern)) {
                routeSegments[2] = ":dni";
            }

            if (routeSegments.length >= 3 && routeSegments[1] === 'incidents' && routeSegments[2].match(this.pattern)) {
                routeSegments[2] = ":id";
            }
            response = "/" + routeSegments.join("/");
        }

        return response;
    }

    rolesComparator(tokenRoles: roleRoute[], routeRoles: roleRoute[]): boolean {

        const routeRolesFormatted = routeRoles.map(item => item.role_id);
        if (tokenRoles.some(item => routeRolesFormatted.includes(item.role_id))) {
            return true;
        }
        return false;
    }

    getRouteId(route: string, http_method: string): Promise<number | null> {

        return prisma.routes.findFirst({
            where: { route: route, http_method: http_method },
            select: {
                route_id: true
            }
        })
            .then(result => result?.route_id ?? null)
            .catch(error => {
                return null;
            })
    }

    async getRouteRoles(route: string | null, http_method: string): Promise<roleRoute[] | null> {
        if (route) {
            const route_id = await this.getRouteId(route, http_method);
            if (route_id) {
                return prisma.routes_x_roles.findMany({
                    where: { route_id: route_id },
                    select: { role_id: true }
                });
            }
        }
        return null;
    }
}

export default MiddlewareQueries;