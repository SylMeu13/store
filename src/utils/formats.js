const CURRENCY_FORMAT = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(price) {
  return CURRENCY_FORMAT.format(price);
}
