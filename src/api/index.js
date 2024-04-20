import axios from "axios";
import { redirect } from "react-router-dom";

const url = import.meta.env.VITE_URL;

const backendInstance = axios.create();

backendInstance.defaults.baseURL = url;

backendInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

backendInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        throw redirect("/login");
    }
    return Promise.reject(error);
});

export const getEmployees = async () => {
    const response = await backendInstance.get("/employees");
    return response.data;
}

export const getEmployee = async (id) => {
    const response = await backendInstance.get(`/employees/${id}`);
    return response.data;
}


export const createEmployee = async (data) => {
    const response = await backendInstance.post("/employees", data);
    return response.data;
}

export const deleteEmployee = async (id) => {
    const response = await backendInstance.delete(`/employees/${id}`);
    return response.data;
}

export const updateEmployee = async (id, data) => {
    const response = await backendInstance.put(`/employees/${id}`, data);
    return response.data;
}

export const getReport = async (employeeId) => {
    const response = await backendInstance.get(`/employees/${employeeId}/report`);
    return response.data;
}

export const updateReport = async (employeeId, report) => {
    const response = await backendInstance.post(`/employees/${employeeId}/report`, { report });
    return response.data;
}

export const getDepartments = async () => {
    const response = await backendInstance.get("/departments");
    return response.data;
}

export const createDepartment = async (data) => {
    const response = await backendInstance.post("/departments", data);
    return response.data;
}

export const login = async (data) => {
    const response = await  backendInstance.post("/manager/login", data);
    return response.data;

}

export const signup = async (data) => {
    const response = await backendInstance.post("/manager/signup", data);
    return response.data;
}