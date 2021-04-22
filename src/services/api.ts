import axios from "axios";
import { IResponse } from "../store/interfaces";

/* API's  STUB */
const TIMEOUT =
  typeof process.env.TIMEOUT === "number" ? process.env.TIMEOUT : 1000;
const BASE_URL = "http://localhost:3001/api/";
export function execApi(
  endpoint: string,
  method = "GET",
  data = {}
): Promise<IResponse> {
  const token = window["_token"] || "";

  const headers = { Authorization: "Bearer " + token };
  const baseURL = BASE_URL;
  let resultPromise: Promise<any>;
  if (method === "POST") {
    resultPromise = axios.post(endpoint, data, { baseURL, headers });
  } else if (method === "PUT") {
    resultPromise = axios.put(endpoint, data, {
      baseURL,
      headers,
      timeout: TIMEOUT,
    });
  } else {
    resultPromise = axios.get(endpoint, {
      baseURL,
      params: data,
      headers,
      timeout: TIMEOUT,
    });
  }

  return new Promise((resolve, reject) => {
    resultPromise
      .then(function ({ data }) {
        let resultData: IResponse = {
          error: true,
          message: "Could not complete request",
          data: null,
        };
        if (data) {
          resultData = {
            error: !data.success,
            message: data.message,
            data: data.data,
          };
        } else {
          resultData = { error: true, message: "Could not complete request" };
        }
        console.log("resultData " + endpoint, resultData);
        resolve(resultData);
      })
      .catch(function (error) {
        console.log("ERRROROOROR", error);
        let errorData: IResponse = {
          error: true,
          message: "",
          data: "Api error",
        };
        if (error.response) {
          errorData.data = error.response.data.message;
        } else {
          errorData.data = error.message;
        }
        resolve(errorData);
      });
  });
}
