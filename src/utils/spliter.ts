import isPath from './is-path.js'

const spliter = (input: string[]): string[] => {
  const tmpArr = []
  for (const value of input) {
    if (value.split('/').length > 1 && !isPath(value)) {
      tmpArr.push(value.split('/')[0])
    }
  }
  return [...input, ...tmpArr]
}

export default spliter
