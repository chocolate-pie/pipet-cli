const isPath = (pathName: string): boolean => {
  const regExp1 = /^\.\/.*$/
  const regExp2 = /^\.\.\/.*$/
  return regExp1.test(pathName) || regExp2.test(pathName)
}

export default isPath
