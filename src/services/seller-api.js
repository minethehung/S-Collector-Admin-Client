import instance from '../utils/api';
export const getSellers = async () => {
    try {
        const response = await instance.get('/api/sellers');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getSeller = async (id) => {
    try {
        const response = await instance.get(`/api/sellers/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export const enableSeller = async (id) => {
    try {
        await instance.put(`/api/sellers/${id}/enable`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const disableSeller = async (id) => {
    try {
        await instance.put(`/api/sellers/${id}/disable`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateSeller = async (id, data) => {
    try {
        await instance.put(`/api/sellers/${id}`, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}