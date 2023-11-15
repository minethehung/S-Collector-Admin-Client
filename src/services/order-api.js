import instance from '../utils/api';
export const getOrders = async () => {
    try {
        const response = await instance.get('/api/order/all');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getPagedOrders = async (page, size) => {
    try {
        const response = await instance.get(`/api/order?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPagedOrdersByPhone = async (page, size, phone) => {
    try {
        const response = await instance.get(`/api/order/phone?phoneNumber=${phone}&page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}