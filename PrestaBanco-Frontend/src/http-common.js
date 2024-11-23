import axios from "axios";

const prestaBancoBackendServer = import.meta.env.VITE_PRESTABANCO_BACKEND_SERVER;       
const prestaBancoBackendPort = import.meta.env.VITE_PRESTABANCO_BACKEND_PORT;

console.groupCollapsed(prestaBancoBackendServer)
console.log(prestaBancoBackendPort)

export default axios.create({
    baseURL: `http://${prestaBancoBackendServer}:${prestaBancoBackendPort}/`,
    headers: {
        "Content-type": "application/json"
    }
    });