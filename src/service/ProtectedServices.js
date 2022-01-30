
import axios from "axios";
import AuthService from "./AuthService";

const API_URL = `${process.env.REACT_APP_API_URL}/api/`;  

class ProtectedServices {
    async getRequest(){
        const token = await AuthService.getCurrentUser().token;
        return axios.create({
            baseURL: API_URL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token,
            }
        });
    }
}

export default ProtectedServices;