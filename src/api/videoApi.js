import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getVideoNames = async () => {
    try{
        const response = await apiClient.get('/video/names');
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const deleteVideo = async (payload) => {
    try {
        const response = await apiClient.delete('/video', {
            data: payload, // Send as query params
        });
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const getBucketId = async () => {
    try{
        const response = await apiClient.get('/bucket/id');
        return response.data;
    } catch (error) {
        return -1;
    }
};