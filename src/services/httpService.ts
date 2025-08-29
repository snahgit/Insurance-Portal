import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { API_ENDPOINTS } from "./apiEndpointService";


// Define response types
export type ErrorType = {
  success: false;
  errorType: string;
  message: string;
  details?: any;
};

export type SuccessType<T = any> = {
  success: true;
  message: string;
  data: T;
};

interface UserData {
  userName: string;
  roleName?: string;
  userType: string;
  permissions: string[]; // Short keys
  hasAcceptedTerms?: boolean;
}

interface StoreData {
  storeId: string;
  ownerId: string;
  name: string;
  maxBranches: number;
  maxWarehouses: number;
  maxEmployee: number;
  maxRole: number;
  language: string;
  mainBranch: string;
  printSize: "A4" | "POS";
}

type RefreshResponseData = {
  accessToken: string;
  user: UserData;
  storeData?: StoreData; // Optional, only for employee/owner
};

type ResponseType<T = any> = SuccessType<T> | ErrorType;

// Token management (in-memory storage)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;
// Create axios instance
const instance = axios.create({
  baseURL: API_ENDPOINTS.baseurl,
  // withCredentials: true, // For cookies (refresh token)
  headers: {
    // "Content-Type": "application/json",
    'X-Mashape-Key': 'required',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'appVersion': '1',
    'mode': 'test'
  },
});

// Add request interceptor for JWT
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getAccessToken()
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      if (originalRequest._retryCount > 2) return Promise.reject(error); // Max 2 retries
      try {
        const userType = localStorage.getItem("userType") || "management";
        const refreshResponse = await instance.post<
          SuccessType<RefreshResponseData>
        >("/mngt/auth/refresh-token", { userType });
        const newToken = refreshResponse.data.data.accessToken;
        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError: any) {
        setAccessToken(null);
        return Promise.reject(refreshError.response?.data || refreshError);
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Helper function to extract response body
const responseBody = <T extends ResponseType<any>>(
  response: AxiosResponse<T>
): T => response.data;

// Generic request function
const createRequest = async <T extends ResponseType<any>>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await instance.request<T>({
      method,
      url,
      data: body,
      signal,
      ...config,
    });
    return responseBody(response);
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw {
        success: false,
        errorType: "RequestAborted",
        message: "Request was aborted",
      };
    }
    throw error;
  }
};

// Define request methods
const requests = {
  get: <T extends ResponseType<any>>(
    url: string,
    config?: AxiosRequestConfig
  ) => createRequest<T>("get", url, undefined, config),
  post: <T extends ResponseType<any>>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => createRequest<T>("post", url, body, config),
  put: <T extends ResponseType<any>>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => createRequest<T>("put", url, body, config),
  patch: <T extends ResponseType<any>>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => createRequest<T>("patch", url, body, config),
  delete: <T extends ResponseType<any>>(
    url: string,
    config?: AxiosRequestConfig
  ) => createRequest<T>("delete", url, undefined, config),
  abort: (controller: AbortController) => controller.abort(),
};

// Restore session on app load
export const restoreSession = async (): Promise<RefreshResponseData> => {
  // if (accessToken) {
  //   // If token exists, assume session is valid (could verify with an API call)
  //   // const userType = localStorage.getItem("userType") || "management";
  //   const response = await instance.get<SuccessType<UserData>>(
  //     "/mngt/auth/verify",
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     }
  //   );
  //   return response.data.data;
  // }

  try {
    const userType = localStorage.getItem("userType") || "management";
    const refreshResponse = await instance.post<
      SuccessType<RefreshResponseData>
    >("/mngt/auth/refresh-token", { userType });
    const {
      accessToken: newToken,
      user,
      storeData,
    } = refreshResponse.data.data;
    setAccessToken(newToken);
    return { accessToken: newToken, user, storeData };
  } catch (error) {
    setAccessToken(null);
    localStorage.removeItem("userType");
    throw error;
  }
};

export default requests;
