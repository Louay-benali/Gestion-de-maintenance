import axios from "axios";

const API_URL = "http://localhost:3001/auth";

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const googleAuth = () => window.location.href = `${API_URL}/google`;
export const verifyEmail = (data) => axios.post(`${API_URL}/approve`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);