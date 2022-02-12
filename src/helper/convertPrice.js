export default function convertPrice(price) {
  let convPrice = parseFloat(price).toFixed(3);
  price > 10 ** 6 && (convPrice = (price / 10 ** 6).toFixed(2) + " Million");
  price > 10 ** 9 && (convPrice = (price / 10 ** 9).toFixed(2) + " Billion");
  price > 10 ** 12 && (convPrice = (price / 10 ** 12).toFixed(2) + " Trillion");

  return convPrice;
}
