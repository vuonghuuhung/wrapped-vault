import bigDecimal from 'js-big-decimal';

export const formatWithDecimal = (amountStr?: string, decimalStr?: string, priceUsd?: string) => {
    const amount = amountStr === undefined ? 0 : amountStr;
    const decimal = decimalStr === undefined ? new bigDecimal(1) : new bigDecimal(10 ** Number(decimalStr));
    const price = priceUsd === undefined ? 1 : Number(priceUsd);
    const amountDecimal = new bigDecimal(amount);
    const value = amountDecimal.divide(decimal, 2).getValue();
    const currency = formatCompactNumber(Number(value) * price);
    return currency;
};

function formatCompactNumber(number: number) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2});
    return formatter.format(number);
}
