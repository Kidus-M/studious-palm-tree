import axios from 'axios';

const CHAPA_BASE_URL = 'https://api.chapa.co/v1';

const chapaApi = axios.create({
  baseURL: CHAPA_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export interface ChapaInitPayload {
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  customization?: {
    title?: string;
    description?: string;
  };
}

export async function initializePayment(payload: ChapaInitPayload) {
  const response = await chapaApi.post('/transaction/initialize', payload);
  return response.data;
}

export async function verifyPayment(txRef: string) {
  const response = await chapaApi.get(`/transaction/verify/${txRef}`);
  return response.data;
}
