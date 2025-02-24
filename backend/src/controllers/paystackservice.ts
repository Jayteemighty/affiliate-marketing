import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface InitializePaymentParams {
    email: string;
    amount: number;
    reference: string;
    callbackUrl: string;
}

const initializePayment = async ({ email, amount, reference, callbackUrl }: InitializePaymentParams): Promise<any> => {
    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount, // Amount in kobo
                reference,
                callback_url: callbackUrl
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.status) {
            return response.data.data;
        } else {
            throw new Error(response.data || 'Failed to initialize payment');
        }
    } catch (error) {
        console.error('Error initializing payment:', error.message);
        throw new Error('Payment initialization error');
    }
};

export default initializePayment;
