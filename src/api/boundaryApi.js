import axios from "axios";

const API_BASE_LINK = "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev"
const DEBUG_MODE = 0;

const apiClient = axios.create({
    baseURL: API_BASE_LINK,
    headers: {
        "Content-Type": "application/json"  
    },
});

// Payload Schema:
// { video_name : string }
export const getCountingBoundaryNames = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.get('/boundary/names', {
            data: payload
        });
        if (DEBUG_MODE) {
            console.log(response);
        }

        if (response.status === 200) {
            result.status = 1;
            result.body = {
                count_boundary_names : response.data.count_boundary_names
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

// Payload Schema:
// { 
//     video_name : string,
//     boundary_data : [[int, int],...],
//     boundary_name : string
// }
export const postCountingBoundary = async (payload) => {
    try{
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.post('/boundary', payload);
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

// Payload Schema:
// {
//     video_name : string,
//     boundary_name : string
// }
export async function deleteCountingBoundary(payloads) {
    try {
        const result = {
            status : 0,
            body : {}
        };

        const response = await apiClient.delete('/boundary', {
            data: payload
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
}

// Payload Schema:
// {
//     video_name : string,
//     boundary_name : string
// }
export async function getCountingBoundary(payloads) {
    try {
        const result = {
            status : 0,
            body : {}
        };

        // TEMP FIX: Switched from GET to POST because JS doesn't allow data to be passed through body on GET calls
        // TODO: Switch back to GET and update AWS LAMBDA to accept query parameters.
        const response = await apiClient.post('/boundary/get', payload);
        if (DEBUG_MODE) {
            console.log(response);
        }
        
        if (response.status === 200) {
            result.status = 1;
            result.body = {
                boundary_data : response.counting_boundary_data
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
}