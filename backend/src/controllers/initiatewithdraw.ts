import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../model/user';
import InitiateWithdraw from '../model/initiatewithdraw';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

interface InitiateWithdrawRequest extends Request {
    body: {
        amount: number;
        bankName: string;
        accountNumber: string;
    };
    userId: Types.ObjectId;
}

// Initiate Withdraw operation
const initiateWithdraw = async (req: InitiateWithdrawRequest, res: Response) => {
    const { amount, bankName, accountNumber } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).send({ message: 'User not authenticated' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.commission < amount) {
            return res.status(400).send({ message: 'Insufficient commission' });
        }

        user.commission -= amount;
        await user.save();

        const newInitiateWithdraw = new InitiateWithdraw({
            userId,
            amount,
            bankName,
            accountNumber,
            status: 'Pending',
            date: new Date(),
        });

        await newInitiateWithdraw.save();

        res.send({ message: 'Initiate Withdraw successful', initiateWithdraw: newInitiateWithdraw });
    } catch (error) {
        console.error('Error processing initiate withdraw:', error);
        res.status(500).send({ message: 'Error processing initiate withdraw' });
    }
};

// Set up the route and middleware
router.post('/initiatewithdraw', authMiddleware, initiateWithdraw);

// export default router;
export {
    router,
    initiateWithdraw
}