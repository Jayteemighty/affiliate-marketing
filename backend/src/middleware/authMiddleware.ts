import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../model/user';

interface AuthRequest extends Request {
    auth?: string;
}

const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract token part
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            const decodedUser = await User.findById((decoded as any).id).select('-password');
            req.auth = decodedUser?._id;
            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                // Token has expired
                res.status(401).json({ message: 'Session expired. Please log in again.' });
            } else {
                // Other JWT verification errors
                res.status(401).json({ message: 'Not authorized, token failed' });
            }
        }
    } else {
        res.status(401).json({ message: 'Not authorized, token missing' });
    }
});

export { protect };
