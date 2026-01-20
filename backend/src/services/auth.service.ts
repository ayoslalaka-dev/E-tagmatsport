import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';
import { RefreshToken } from '../entities/RefreshToken';
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

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

    async register(data: RegisterDTO): Promise<{ user: Partial<User>; tokens: TokenPair }> {
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

        // Generate tokens
        const tokens = await this.generateTokenPair(user.id);

        // Return user without password
        const { mot_de_passe, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, tokens };
    }

    async login(data: LoginDTO): Promise<{ user: Partial<User>; tokens: TokenPair }> {
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

        // Generate tokens
        const tokens = await this.generateTokenPair(user.id);

        // Return user without password
        const { mot_de_passe, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, tokens };
    }

    async refreshToken(refreshToken: string): Promise<TokenPair> {
        // Find the refresh token in database
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken, revoked: false }
        });

        if (!storedToken) {
            throw new AppError('Invalid refresh token', 401);
        }

        // Check if token is expired
        if (new Date() > storedToken.expiresAt) {
            // Revoke the expired token
            storedToken.revoked = true;
            await this.refreshTokenRepository.save(storedToken);
            throw new AppError('Refresh token expired', 401);
        }

        // Verify the user still exists
        const user = await this.userRepository.findOne({ where: { id: storedToken.userId } });
        if (!user) {
            throw new AppError('User not found', 401);
        }

        // Revoke the old refresh token
        storedToken.revoked = true;
        await this.refreshTokenRepository.save(storedToken);

        // Generate new token pair
        return this.generateTokenPair(user.id);
    }

    async logout(refreshToken: string): Promise<void> {
        // Find and revoke the refresh token
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken }
        });

        if (storedToken) {
            storedToken.revoked = true;
            await this.refreshTokenRepository.save(storedToken);
        }
    }

    async revokeAllUserTokens(userId: string): Promise<void> {
        await this.refreshTokenRepository.update(
            { userId, revoked: false },
            { revoked: true }
        );
    }

    async getProfile(userId: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const { mot_de_passe, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private generateAccessToken(userId: string): string {
        return jwt.sign({ userId }, env.JWT_SECRET, {
<<<<<<< HEAD
            expiresIn: env.JWT_ACCESS_EXPIRES_IN
=======
            expiresIn: env.JWT_EXPIRES_IN as any
>>>>>>> 28858ac03e8e0bd1d8271eeca08054e2a134360d
        });
    }

    private async generateTokenPair(userId: string): Promise<TokenPair> {
        // Generate access token
        const accessToken = this.generateAccessToken(userId);

        // Generate refresh token (random string)
        const refreshTokenValue = crypto.randomBytes(64).toString('hex');

        // Calculate refresh token expiry (parse the duration string)
        const expiresIn = this.parseExpiry(env.JWT_REFRESH_EXPIRES_IN);
        const expiresAt = new Date(Date.now() + expiresIn);

        // Store refresh token in database
        const refreshToken = this.refreshTokenRepository.create({
            token: refreshTokenValue,
            userId,
            expiresAt
        });
        await this.refreshTokenRepository.save(refreshToken);

        return {
            accessToken,
            refreshToken: refreshTokenValue
        };
    }

    private parseExpiry(expiry: string): number {
        const match = expiry.match(/^(\d+)([smhd])$/);
        if (!match) {
            return 7 * 24 * 60 * 60 * 1000; // Default: 7 days
        }

        const value = parseInt(match[1]);
        const unit = match[2];

        switch (unit) {
            case 's': return value * 1000;
            case 'm': return value * 60 * 1000;
            case 'h': return value * 60 * 60 * 1000;
            case 'd': return value * 24 * 60 * 60 * 1000;
            default: return 7 * 24 * 60 * 60 * 1000;
        }
    }
}
