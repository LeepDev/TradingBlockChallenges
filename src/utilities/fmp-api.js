import sendRequest from "./send-request";

const BASE_URL = '/api/fmp';

export async function getCurrentPrice(stock) {
  return sendRequest(`${BASE_URL}/getCurrentPrice/${stock}`)
}