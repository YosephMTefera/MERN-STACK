import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://your-gallery.onrender.com",
});

export default apiRequest;
