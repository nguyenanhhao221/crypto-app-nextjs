//Check if price up or down in the coin history by comparing the first value price and the last, this will help to determine the chart line's color
export const isPriceUp = (arrayOfPrice: number[]) => {
    return arrayOfPrice[0] - arrayOfPrice[arrayOfPrice.length - 1] >= 0
        ? false
        : true;
};
