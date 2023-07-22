export function removeSpecialChars(str) {
    return str.replace(/[^\w\s]/gi, "");
}
export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function slugify(str) {
    return removeAccents(removeSpecialChars(str.toLowerCase())).replace(/\s/g, "-");
}
//# sourceMappingURL=string.js.map