import isPath from './../src/utils/is-path.js'

console.log(isPath('./hello'))
console.log(isPath('../hello'))
console.log(isPath('.hello'))
console.log(isPath('hello>>><<<./'))