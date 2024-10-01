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

        if (response.status === 200) {
            result.status = 1;
            result.body = {
                video_names : response.data.video_names
            };
        } else {
            result.status = 0;
            result.body = {};
        }
        return result;
    } catch (error) {
        return -1;
    }
};

export const deleteVideo = async (payload) => {
    try {
        const response = await apiClient.delete('/video', {
            data: payload, // Send as query params
        });
        
        if (response.status === 200) {
            result.status = 1;
            result.body = {};
        } else {
            result.status = 0;
            result.body = {};
        }
        return result;
    } catch (error) {
        return -1;
    }
};

export const getBucketId = async () => {
    try{
        const result = {
            status : 0,
            body : {}
        };
        const response = await apiClient.get('/bucket/id');

        if (response.status === 200) {
            result.status = 1;
            result.body = {
                bucket_id : response.data.S3_bucket_ID
            };
        } else {
            result.status = 0;
            result.body = {};
        }
        return result;
    } catch (error) {
        return -1;
    }
};