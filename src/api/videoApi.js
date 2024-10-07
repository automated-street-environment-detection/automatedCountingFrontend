import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const API_BASE_LINK =
  "https://h50gco47p0.execute-api.us-east-2.amazonaws.com/dev";
const DEBUG_MODE = 0; // 1 for verbose output

const apiClient = axios.create({
  baseURL: API_BASE_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

const s3 = new S3Client();

// Payload Schema:
// {
//     file_name : string,
//     video_data : not sure, need to figure out how to parse video data
// }
export const postVideo = async (payload) => {
  try {
    const file_name = payload.file_name;
    const video_data = payload.video_data;
    const params = {
      Bucket: "video-footage-storage",
      Key: file_name,
      Expires: 120,
    };

    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    // const url = s3.getSignedUrl("putObject", params);

    // const response = axios.put(url, video_data, {
    //   headers: {
    //     "Content-Type": "video/mp4",
    //   },
    //   onUploadProgress: (progressEvent) => {
    //     const progress = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     console.log("Upload progress: ${progress}%");
    //   },
    // });

    if (response.status === 200) {
      return {
        status: 1,
        body: {},
      };
    } else {
      return {
        status: 0,
        body: {},
      };
    }
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
// {}
export const getVideoNames = async () => {
  try {
    const result = {
      status: 0,
      body: {},
    };
    const response = await apiClient.get("/video/names");

    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 200) {
      result.status = 1;
      result.body = {
        video_names: response.data.video_names,
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
//     video_name : string
// }
export const getVideoURL = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };
    const response = await apiClient.post("/video/url", payload);

    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 200) {
      result.status = 1;
      result.body = {
        s3_bucket_ID: response.S3_Bucket_ID,
        video_name: response.video_name,
        video_url: response.video_url,
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
//     video_name : string
// }
export const deleteVideo = async (payload) => {
  try {
    const result = {
      status: 0,
      body: {},
    };
    const response = await apiClient.delete("/video", {
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
      body: {},
    };
  }
};

// Likely not used. I hard coded the bucket name
export const getBucketId = async () => {
  try {
    const result = {
      status: 0,
      body: {},
    };
    const response = await apiClient.get("/bucket/id");
    if (DEBUG_MODE) {
      console.log(response);
    }

    if (response.status === 200) {
      result.status = 1;
      result.body = {
        bucket_id: response.data.S3_bucket_ID,
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
