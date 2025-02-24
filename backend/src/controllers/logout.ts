import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// Logout operation
const logout = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Send a success response for logout
        return res.status(200).json({
            success: true,
            message: 'Logout successful. Please log in again to access the system.',
        });
    } catch (error) {
        console.error('Error during logout:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while logging out.',
        });
    }
});

export { logout };
