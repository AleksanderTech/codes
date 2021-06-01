export function formatDate(date:Date): string {
    return `${padWithZero(date.getDate())}-${padWithZero(date.getMonth()+1)}-${date.getFullYear()}`;
}

function padWithZero(number:number) {
    return number < 10 ? '0' + number : number;
}
