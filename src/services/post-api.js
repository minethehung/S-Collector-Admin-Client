import instance from '../utils/api';
export const getPagedPosts = async (page, size) => {
    try {
        const response = await instance.get(`/api/post/admin?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPagedPostsByPhone = async (page, size, phone) => {
    try {
        const response = await instance.get(`/api/post/phone?phoneNumber=${phone}&page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPagedPostsByStatus = async (page, size, status) => {
    try {
        const response = await instance.get(`/api/post/status?status=${status}&page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPostById = async (id) => {
    try {
        const response = await instance.get(`/api/post/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deletePost = async (id) => {
    try {
        await instance.delete(`/api/post/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}