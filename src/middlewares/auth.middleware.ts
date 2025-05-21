import express, { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    return express.json()(req, res, next);
}

export default authorization;