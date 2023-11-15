import instance from '../utils/api';
export const getTransactions = async () => {
    try {
        const response = await instance.get('/api/transactions');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}