
/** Returns true if the code is run on the browser */
export function isBrowser() : boolean {
    return typeof window !== 'undefined';
}

/** Returns true if the code is run on the server */
export function isServer() : boolean {
    return !isBrowser();
}
