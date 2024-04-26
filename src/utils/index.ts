function convertNumberToOneDecimalPlaces(number?: number): number {
    if (number === undefined) {
        number = 0 // or any default value
    }
    return parseFloat(number.toFixed(1))
}

export { convertNumberToOneDecimalPlaces }
