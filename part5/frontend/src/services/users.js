import axios from 'axios';

const baseUrl = "/http://localhost:3001/api/users";

const getUser =async(id) =>{
    const response = await axios.get(`${baseUrl}/%{id}`);
    return response.data;
}

export default {getUser}