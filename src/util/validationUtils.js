function emptyOrNull(value) {
    return !value || value == "";
}

function validBornId(value) {
    const regex = /[0-9]{13}/g
    return regex.exec(value);
}

function validEmail(value) {
    var regex = /\S+@\S+\.\S+/;
    return regex.exec(value);
}

function isNegativeNumber(number) {
    return number < 0;
}

export { emptyOrNull, validBornId, validEmail, isNegativeNumber };