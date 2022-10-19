const _concat = (val1: any[], val2: any[]): any[] => {
  const dataValue = val2
  for (const value of val1) {
    dataValue.push(value)
  }
  return dataValue
}

export default _concat
