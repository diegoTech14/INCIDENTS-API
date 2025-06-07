import express, { Response, Request, NextFunction } from 'express';
import JwtController from '../utils/jwtController';
import { jwtPayload } from '../interfaces/userInterfaces';
import { MiddlewareQueries } from '../utils/middlewareQueries';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtController = new JwtController();
        const bearer = req.headers.authorization;
        const route = req.path;
        const method = req.method;
        const middlewareQueries: MiddlewareQueries = new MiddlewareQueries();
        const formatedRoute = middlewareQueries.routeComparator(route);
        let shouldContinue = false;

        if (!bearer) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
        } else {
            const cleanedToken = bearer.replace("Bearer ", "").trim();
            const token = jwtController.jwtDecoder(cleanedToken);

            if (!token) {
                console.log(token);
                res.status(401).json({ message: "Unauthorized: Invalid token" });
            } else {
                const roles = await middlewareQueries.getRouteRoles(formatedRoute, method);

                if (!roles || roles.length === 0) {
                    shouldContinue = true;
                } else {
                    const hasPermission = middlewareQueries.rolesComparator(token.roles, roles);
                    shouldContinue = hasPermission;

                    if (!hasPermission) {
                        res.status(403).json({ message: "Forbidden: Insufficient permissions" });
                    }
                }
            }
        }

        if (shouldContinue) {
            next();
        }

    } catch (error) {
        console.error("Authorization error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default authorization;
