export function getRandomToken(lentgh: number = 32): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < lentgh; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}