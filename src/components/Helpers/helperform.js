export function isEmpty(value) {
    return value.trim() === '';
}

export function isValidEmail(email) {
    const partes = email.split('@');
    if (partes.length !== 2) return false;
    const [parteLocal, dominio] = partes;
    if (parteLocal.length === 0 || dominio.length === 0) return false;
    const dominioPartes = dominio.split('.');
    if (dominioPartes.length < 2 || dominioPartes.some(part => part.length === 0)) return false;
    return true;
}

export function limitMaxLength(value, maxLength) {
    return value.length <= maxLength;
}

export function validatePhoneNumber(number) {

    const numberclean = number.split(" ")
    if (number.split("(")) return false
    if (number.split(")")) return false    
    if (number.split("-")) return false
   if (number.length("!== 10")) return false
    console.log(numberclean);

    if (numberclean) {
        console.log("Número de teléfono válido.");
    } else {
        console.log("Número de teléfono inválido.");
    };
}


export function getErrorMessage(fieldName, value, maxLength = 500) {
    if (isEmpty(value)) {
        return `${fieldName} no puede estar vacío.`;
    }
    if (fieldName === 'Email' && !isValidEmail(value)) {
        return 'Por favor ingresa un correo electrónico válido.';
    }
    if (fieldName === 'Mensaje' && !limitMaxLength(value, maxLength)) {
        return `El mensaje no puede tener más de ${maxLength} caracteres.`;
    }
    return '';


}
