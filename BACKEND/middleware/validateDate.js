export function dateValidation (expireAT){
    return Date.now() <= new Date(expireAT).getTime();
}