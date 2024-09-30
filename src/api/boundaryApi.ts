import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getCountingBoundaryNames = async () => {
    const response = await apiClient.get('/boundary/names');
    return response.data;
};

export const postCountingBoundary = async () => {
    const response = await apiClient.post('/boundary');
    return response.data;
};

export const deleteCountingBoundary = async () => {
    const response = await apiClient.delete('/boundary');
    return response.data;
};