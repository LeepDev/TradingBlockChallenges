import * as fmpAPI from './fmp-api';

export function getShortQuote(stock) {
  return fmpAPI.getShortQuote(stock)
}