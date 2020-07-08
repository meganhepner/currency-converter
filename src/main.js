import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyExchange } from './../src/currency-service.js';

function converterUSD(inputAmount, convertTo, response) {
  let conversion;
  if (response) {
    if (convertTo === "EUR") {
      conversion = (inputAmount * response.conversion_rates.EUR); 
      return conversion.toFixed(2);
    } else if (convertTo === "AUD") {
      conversion = (inputAmount * response.conversion_rates.AUD); 
      return conversion.toFixed(2);
    } else if (convertTo === "CAD") {
      conversion = (inputAmount * response.conversion_rates.CAD); 
      return conversion.toFixed(2);
    } else if (convertTo === "MXN") {
      conversion = (inputAmount * response.conversion_rates.MXN); 
      return conversion.toFixed(2);
    } else if (convertTo === "JPY") {
      conversion = (inputAmount * response.conversion_rates.JPY); 
      return conversion.toFixed(2);
    } 
  } else {
    $('.convertedCurrency').text("Please choose one of the available currency options and try again!");
  }
}

function converterOther(inputAmount, convertFrom, response) {
  let conversion;
  if (response) {
    if (convertFrom === "EUR") {
      conversion = (inputAmount * (1/response.conversion_rates.EUR)); 
      return conversion.toFixed(2);
    } else if (convertFrom === "AUD") {
      conversion = (inputAmount * (1/response.conversion_rates.AUD)); 
      return conversion.toFixed(2);
    } else if (convertFrom === "CAD") {
      conversion = (inputAmount * (1/response.conversion_rates.CAD)); 
      return conversion.toFixed(2);
    } else if (convertFrom === "MXN") {
      conversion = (inputAmount * (1/response.conversion_rates.MXN)); 
      return conversion.toFixed(2);
    } else if (convertFrom === "JPY") {
      conversion = (inputAmount * (1/response.conversion_rates.JPY)); 
      return conversion.toFixed(2);
    } 
  } else {
    $('.convertedCurrency').text("Please choose one of the available currency options and try again!");
  }
}

$(document).ready(function () {
  $('form#toUSDConverter').submit(function(event){
    event.preventDefault();
    let inputAmount = $("input#amount").val();
    let convertTo = $("#selectCurrency").val();
    (async () => {
      let currencyExchange = new CurrencyExchange();
      let response = await currencyExchange.conversionRateUSD();
      if (!response.result) {
        $('.convertedCurrency').text(`${response}`);
      } else {
        let conversion = converterUSD(inputAmount, convertTo, response);
        $('.convertedCurrency').text(`${inputAmount} USD is worth ${conversion} in ${convertTo}`);
      } 
    })();
  });

  $('form#USDtoOther').submit(function(event){
    event.preventDefault();
    let inputAmount = $("input#amount").val();
    let convertTo = $("#selectCurrency").val();
    (async () => {
      let currencyExchange = new CurrencyExchange();
      let response = await currencyExchange.conversionRateUSD();
      if (!response.result) {
        $('.convertedCurrency').text(`${response}`);
      } else {
        let conversion = converterOther(inputAmount, convertTo, response);
        $('.currencyToUSD').text(`${inputAmount} in ${convertTo} is ${conversion} USD`);
      } 
    })();
  });
});