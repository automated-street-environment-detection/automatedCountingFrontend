import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getVideoNames = async () => {
    const response = await apiClient.get('/video/names');
    return response.data;
};

export const deleteVideo = async () => {
    const response = await apiClient.delete('/video');
    return response.data;
};

export const getBucketId = async () => {
    const response = await apiClient.get('/bucket/id');
    return response.data;
};