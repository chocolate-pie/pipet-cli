import { parse, version } from 'acorn'

console.log(JSON.stringify(parse('console.log(\'\')', { ecmaVersion: 2020 }), null, 2))
console.log(parse('console.log(\'\')', { ecmaVersion: 2020 }).sourceType)
console.log(version)
