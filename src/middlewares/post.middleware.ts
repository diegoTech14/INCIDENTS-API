import express, { Response, Request, NextFunction } from "express";

export const jsonForPosts = (req: Request, res: Response, next: NextFunction) => {
    if(req.method == 'POST' || req.method == 'PATCH' || req.method == 'PUT'){
        return express.json()(req, res, next);
    }
    next();
}

export default jsonForPosts;