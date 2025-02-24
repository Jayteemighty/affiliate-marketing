import { Server } from 'socket.io';
import Sale from '../model/sales'; // Assuming Sale model is imported from the correct path

const io = new Server();

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('new-sale', async (saleData) => {
        try {
            const sale = new Sale(saleData);
            await sale.save();

            // Update sales data in real-time
            io.emit('sales-update', sale);
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    });
});

export default io;
