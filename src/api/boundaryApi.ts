import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getCountingBoundaryNames = async (payload: {video_name: string}) => {
    try{
        const response = await apiClient.get('/boundary/names', {
            data: payload
        });
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const postCountingBoundary = async (payload: { video_name: string; boundary_name: string; boundary_data: number[][]}) => {
    try{
        const response = await apiClient.post('/boundary', payload);
        return response.data;
    } catch (error) {
        return -1;
    }
};

export const deleteCountingBoundary = async (payload: {video_name: string; boundary_name: string}) => {
    try{
        const response = await apiClient.delete('/boundary', {
            data: payload
        });
        return response.data;
    } catch (error) {
        return -1;
    }
};