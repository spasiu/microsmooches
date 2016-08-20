export default {
    get: () => Promise.resolve('Hello World'),
    getError: () => Promise.reject(new Error('Hello World'))
}
