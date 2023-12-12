import sendRequest from "./send-request";

const BASE_URL = '/api/fmp';

export async function getShortQuote(stock) {
  return sendRequest(`${BASE_URL}/getShortQuote/${stock}`)
}