import axios from "axios";

export const apiConnector = async (method, url, bodyData, headers) => {
  try {
    console.log("API CALL:", url); // ✅ correct log

    const response = await axios({
      method: method,
      url: url, // ✅ already full URL from apis.js
      data: bodyData ? bodyData : null,
      headers: headers ? headers : null,
    });

    return response;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};