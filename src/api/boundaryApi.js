import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"  
    },
});

export const getCountingBoundaryNames = async (payload) => {
    try{
        const response = await apiClient.get('/boundary/names', {
            data: payload
        });
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const postCountingBoundary = async (payload) => {
    try{
        const response = await apiClient.post('/boundary', payload);
        return response.data;
    } catch (error) {
        return -1;
    }
};

export async function deleteCountingBoundary(payloads) {
    try {
        const response = await apiClient.delete('/boundary', {
            data: payload
        });
        return response.data;
    } catch (error) {
        return -1;
    }
}