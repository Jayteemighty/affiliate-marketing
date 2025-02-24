import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Withdrawal {
    id: string;
    userId: string;
    amount: number;
    status: string;
    date: Date;
}

// API endpoint to get withdrawals for a specific user
app.get('/api/withdrawals', async (req: Request, res: Response) => {
    const userId = req.query.userId as string;  // Get the userId from the query string

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
        // Fetch withdrawals from the database
        const withdrawals = await getWithdrawalsByUserId(userId);

        res.json({ success: true, data: withdrawals });
    } catch (error) {
        console.error('Error fetching withdrawals:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch withdrawals' });
    }
});

// Function to interact with the database (replace with actual logic)
async function getWithdrawalsByUserId(userId: string): Promise<Withdrawal[]> {
    // Replace this with actual database query logic
    // Return an array of withdrawals filtered by userId
    return [];
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
