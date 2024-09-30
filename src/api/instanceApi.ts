import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getDataInstanceNames = async () => {
    try{
        const response = await apiClient.get('/data-instance/names');
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const postDataInstance = async () => {
    try{
        const response = await apiClient.post('/data-instance');
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const patchDataInstance = async () => {
    try{
        const response = await apiClient.patch('/data-instance');
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const deleteDataInstance = async () => {
    try{
        const response = await apiClient.delete('/data-instance');
        return response.data;
    } catch (error) {
        return -1;
    }
};