import { existsSync } from 'fs'
import path from 'path'
const isPackageJsonExists = (dirname: string): boolean => {
  if (existsSync(path.join(dirname, 'package.json'))) {
    return true
  }
  return false
}

export default isPackageJsonExists
