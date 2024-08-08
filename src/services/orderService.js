import axios from 'axios';

export const createOrder = async order => {
    try {
        const data = await axios.post('/api/orders/create', order);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getNewOrderForCurrentUser = async () => {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
    return data;
};

/**
 * Actualiza el documento de la orden con el paymentId y el estodo PAYED
 * @param {*} paymentId id del pago de la orden
 * @returns id de la orden
 */
export const pay = async paymentId => {
    try {
        const { data } = await axios.put('/api/orders/pay', { paymentId });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const trackOrderById = async orderId => {
    const { data } = await axios.get('/api/orders/track/' + orderId);
    return data;
};

export const getAll = async state => {
    const { data } = await axios.get(`/api/orders/${state ?? ''}`);
    return data;
};

export const getAllStatus = async () => {
    const { data } = await axios.get('/api/orders/allstatus');
    return data;
};

export const updateStatus = async (updatedOrder) => {
    const { data } = await axios.put('/api/orders/updateStatus', updatedOrder);
    return data;
}

export const deleteOrderById = async orderId => {
    return await axios.delete('/api/orders/delete/' + orderId);
} 
