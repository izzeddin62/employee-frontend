import axios from "axios";

const url = import.meta.env.VITE_URL;

axios.defaults.baseURL = url;
export const getEmployees = async () => {
    const response = await axios.get("/employees");
    return response.data;
}

export const getEmployee = async (id) => {
    const response = await axios.get(`/employees/${id}`);
    return response.data;
}


export const createEmployee = async (data) => {
    const response = await axios.post("/employees", data);
    return response.data;
}

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`/employees/${id}`);
    return response.data;
}

export const updateEmployee = async (id, data) => {
    const response = await axios.put(`/employees/${id}`, data);
    return response.data;
}

export const getReport = async (employeeId) => {
    const response = await axios.get(`/employees/${employeeId}/report`);
    return response.data;
}

export const updateReport = async (employeeId, report) => {
    const response = await axios.post(`/employees/${employeeId}/report`, { report });
    return response.data;
}
