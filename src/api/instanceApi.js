import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"
const DEBUG_MODE = 0;

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getDataInstanceNames = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.get('/data-instance/names', {
            data: payload, // Send in request body
        });
        if (DEBUG_MODE) {
            console.log(response);
        }

        if (response.status === 200) {
            result.status = 1;
            result.body = {
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

export const postDataInstance = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.post('/data-instance', {
            data: payload, // Pass payload through request body
        });
        if (DEBUG_MODE) {
            console.log(response);
        }

        if (response.status === 200) {
            result.status = 1;
            result.body = {
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

export const patchDataInstance = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.patch('/data-instance', payload);
        if (DEBUG_MODE) {
            console.log(response);
        }
        
        if (response.status === 200) {
            result.status = 1;
            result.body = {
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

export const deleteDataInstance = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.delete('/data-instance', {
            data: payload // Pass payload through request body
        });
        if (DEBUG_MODE) {
            console.log(response);
        }

        if (response.status === 200) {
            result.status = 1;
            result.body = {
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