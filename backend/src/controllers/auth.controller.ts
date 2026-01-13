import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { nom, email, password, role } = req.body;

            if (!nom || !email || !password) {
                return res.status(400).json({ message: 'Name, email and password are required' });
            }

            const result = await authService.register({ nom, email, password, role });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const result = await authService.login({ email, password });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            const user = await authService.getProfile(req.user.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response) {
        // JWT is stateless, so logout is handled client-side
        res.json({ message: 'Logged out successfully' });
    }
}
