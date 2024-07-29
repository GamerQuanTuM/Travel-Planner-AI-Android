import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://travel-planner-ai-web-1.onrender.com/api/v1",
})

export default axiosInstance