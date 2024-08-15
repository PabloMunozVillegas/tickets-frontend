import axios from "axios";

const url = 'http://localhost:5000';

const CompleteUrl = {
    createArea: `${url}/api/areas/create`,
    createSucursal: `${url}/api/sucursal/create`,
    createTicket: `${url}/api/ticket/create`
};

const axiosFunctionPost = async (endpoint, data) => {
    console.log('Data being sent:', data); // Verificar los datos antes de enviar
    try {
        const response = await axios.post(CompleteUrl[endpoint], data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error posting to ${CompleteUrl[endpoint]}:`, error);
        throw error;
    }
};

export const createArea = (data) => axiosFunctionPost('createArea', data);
export const createSucursal = (data) => axiosFunctionPost('createSucursal', data);
export const createTicket = (data) => axiosFunctionPost('createTicket', data);
