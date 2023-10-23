export function formatCoin(coin: number, currencyCode: string) {
  let languageCode;
  let currency 

  switch (currencyCode) {
      case "USD":
          languageCode = "en-US"; 
          currency = currencyCode
          break;
      case "EUR":
          languageCode = "fr-FR"; 
          currency = currencyCode
          break;
      case "BRL":
          languageCode = "pt-BR"; 
          currency = currencyCode
          break;
      case "GBP":
          languageCode = "en-GB"; 
          currency = currencyCode
          break;
      case "JPY":
          languageCode = "ja-JP"; 
          currency = currencyCode
          break;
      case "AUD":
          languageCode = "en-AU"; 
          currency = currencyCode
          break;
      case "CAD":
          languageCode = "en-CA"; 
          currency = currencyCode
          break;
      case "CHF":
          languageCode = "de-CH"; 
          currency = currencyCode
          break;
      case "CNY":
          languageCode = "zh-CN";
          currency = currencyCode
          break;
      case "INR":
          languageCode = "hi-IN"; 
          currency = currencyCode
          break;
      default:
          languageCode = "en-US";  
          currency = "USD"

  }

  return new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency: currency ,
  }).format(coin);
  }