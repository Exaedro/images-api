export function getDate() {
    const date = new Date()
    let x = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}` 
    return x
}