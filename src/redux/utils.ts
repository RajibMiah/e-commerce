export const delay = ms => new Promise(res => setTimeout(res, ms));

export const isBrowser = typeof window !== "undefined";