import axios from "axios";

const url = process.env.SERVER_URL || "http://localhost:5000";

const CompleteUrl = {
    getAreas: `${url}/api/areas/listar`,
    getTickets: `${url}/api/ticket/listar`,
};

const axiosFunctionGet = async (endpoint, params) => {
    try {
        const response = await axios.get(CompleteUrl[endpoint], { params });
        return response.data;
    } catch (error) {
        console.error(`Error getting from ${CompleteUrl[endpoint]}:`, error);
        throw error;
    }
};

export const getAreas = (params) => axiosFunctionGet('getAreas', params);
export const getTickets = (params) => axiosFunctionGet('getTickets', params);
