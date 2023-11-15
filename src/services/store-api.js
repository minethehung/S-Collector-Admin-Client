import instance from '../utils/api';
export const getStores = async () => {
    try {
        const response = await instance.get('/api/stores');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const enableStore = async (id) => {
    try {
        await instance.patch(`/api/stores/${id}/enable`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const disableStore = async (id) => {
    try {
        await instance.patch(`/api/stores/${id}/disable`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateStore = async (id, data) => {
    try {
        await instance.put(`/api/stores/${id}`, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const payInStore = async (id, amount) => {
    try {
        await instance.patch(`/api/wallets/${id}?amount=${amount}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}