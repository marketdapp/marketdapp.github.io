export const formatChainAsNum = (chainIdHex) => {
    return parseInt(chainIdHex)
}

export const formatAddress = (addr) => {
    const upperAfterLastTwo = addr.slice(0,2) + addr.slice(2)
    return `${upperAfterLastTwo.substring(0, 6)}...${upperAfterLastTwo.substring(38)}`
}

export const formatMoney = (currency, amount) => {
    return (new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    })).format(amount);
}

export const equal = (str1, str2) => str1.toLowerCase() === str2.toLowerCase();
