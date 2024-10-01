import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"
const DEBUG_MODE = 0; // 1 for verbose output

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getVideoNames = async () => {
    try{
        const result = {
            status : 0,
            body : {}
        };
        const response = await apiClient.get('/video/names');

        if (DEBUG_MODE) {
            console.log(response);
        }

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
        if (DEBUG_MODE) {
            console.error(error);
        }
        return {
            status: -1,
            body : {}
        };
    }
};

export const deleteVideo = async (payload) => {
    try {
        const result = {
            status : 0,
            body : {}
        };
        const response = await apiClient.delete('/video', {
            data: payload, // Send as query params
        });

        if (DEBUG_MODE) {
            console.log(response);
        }
        
        if (response.status === 200) {
            result.status = 1;
            result.body = {};
        } else {
            result.status = 0;
            result.body = {};
        }
        return result;
    } catch (error) {
        if (DEBUG_MODE) {
            console.error(error);
        }
        return {
            status: -1,
            body : {}
        };
    }
};

// Works as expected
export const getBucketId = async () => {
    try{
        const result = {
            status : 0,
            body : {}
        };
        const response = await apiClient.get('/bucket/id');
        if (DEBUG_MODE) {
            console.log(response);
        }

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
        if (DEBUG_MODE) {
            console.error(error);
        }
        return {
            status: -1,
            body : {}
        };
    }
};