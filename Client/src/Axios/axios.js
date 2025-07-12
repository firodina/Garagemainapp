//import axios from "axios";
import axios from "axios";
const axiosBase = axios.create({
    baseURL: "http://localhost:3005/api",
  });
  
  export default axiosBase;