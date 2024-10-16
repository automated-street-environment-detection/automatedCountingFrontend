import axios from "axios";

const API_BASE_LINK =
  "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev";
const DEBUG_MODE = 0;

const apiClient = axios.create({
  baseURL: API_BASE_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

// Payload Schema:
// {
//     user_id : string,
//     video_name : string,
//     boundary_name : string
// }
export const getDataInstanceNames = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };

    // TEMP FIX: Swapped GET to POST because JS doesn't allow data passed through body if using GET methods.
    // TODO: Switch back to GET and update AWS Lambda to pares query parameters
    const response = await apiClient.post("/data-instance/names", payload);
    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 200) {
      result.status = 1;
      // console.log(response);
      result.body = {
        instance_name: response.data.counting_data_instance_names,
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
      body: {},
    };
  }
};

// Payload Schema:
// {
//     user_email : string,
//     video_name : string,
//     boundary_name : string,
//     instance_name : string
// }
export const postDataInstance = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };

    const response = await apiClient.post("/data-instance", payload);
    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 201) {
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
      body: {},
    };
  }
};

// Payload Schema:
// {
//     user_email : string,
//     video_name : string,
//     boundary_name : string,
//     instance_name : string,
//     instance_data : stringified json object
// }
export const patchDataInstance = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };

    const response = await apiClient.patch("/data-instance", payload);
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
      body: {},
    };
  }
};

// Payload Schema:
// {
//     user_id : string,
//     video_name : string,
//     boundary_name : string
// }
export const getDataInstance = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };

    // Temporary FIX: get cannot pass data through body. Switched to POST
    // TODO: Change back to GET and parse query parameters in AWS Lambda
    const response = await apiClient.post("/data-instance/get", payload);
    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 200) {
      console.log(response);
      result.status = 1;
      result.body = {
        instance_data: response.data,
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
      body: {},
    };
  }
};

// Payload Schema:
// {
//     user_email : string,
//     video_name : string,
//     boundary_name : string,
//     instance_name : string
// }
export const deleteDataInstance = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };

    const response = await apiClient.delete(
      "/data-instance",
      payload // Pass payload through request body
    );
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
      body: {},
    };
  }
};
