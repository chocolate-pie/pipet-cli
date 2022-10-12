const isIncludeArray = (search: string, target: string[]): boolean => {
    for (let i = 0; i < target.length; i++) {
      if (target[i] === search) {
        return true
      }
    }
    return false
  }

export default isIncludeArray
