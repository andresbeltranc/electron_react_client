import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4321",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
});