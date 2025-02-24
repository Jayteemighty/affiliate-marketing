import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET!,
        { expiresIn: '48h' }
    );
};

export { generateToken };
