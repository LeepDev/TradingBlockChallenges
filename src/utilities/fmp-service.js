import * as fmpAPI from './fmp-api';

export function getCurrentPrice(stock) {
  return fmpAPI.getCurrentPrice(stock)
}

export function getCurrentQuote(stock) {
  return fmpAPI.getCurrentQuote(stock)
}