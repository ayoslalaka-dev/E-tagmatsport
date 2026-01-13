import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';
import { env } from '../config/env';
import { AppError } from '../middlewares/error.middleware';

interface RegisterDTO {
    nom: string;
    email: string;
    password: string;
    role?: UserRole;
}

interface LoginDTO {
    email: string;
    password: string;
}

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(data: RegisterDTO): Promise<{ user: Partial<User>; token: string }> {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new AppError('Email already registered', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        const user = this.userRepository.create({
            nom: data.nom,
            email: data.email,
            mot_de_passe: hashedPassword,
            role: data.role || UserRole.SHIPPER
        });

        await this.userRepository.save(user);

        // Generate token
        const token = this.generateToken(user.id);

        // Return user without password
        const { mot_de_passe, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async login(data: LoginDTO): Promise<{ user: Partial<User>; token: string }> {
        // Find user
        const user = await this.userRepository.findOne({ where: { email: data.email } });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(data.password, user.mot_de_passe);
        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generate token
        const token = this.generateToken(user.id);

        // Return user without password
        const { mot_de_passe, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async getProfile(userId: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const { mot_de_passe, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private generateToken(userId: string): string {
        return jwt.sign({ userId }, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN
        });
    }
}
