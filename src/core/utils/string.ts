export function removeSpecialChars(str: string): string {
  return str.replace(/[^\w\s]/gi, "");
}

export function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return removeAccents(removeSpecialChars(str.toLowerCase())).replace(
    /\s/g,
    "-"
  );
}
