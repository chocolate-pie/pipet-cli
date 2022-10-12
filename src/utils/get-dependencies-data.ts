import isPackageJsonExists from './is-package-json-exists.js'
import path from 'path'
import fs from 'fs'
const getDependanciesData = (
  dirname: string
): { dependencies: string[], devDependencies: string[] } => {
  if (!isPackageJsonExists(dirname)) {
    throw new Error('package.json Not Found')
  }
  const txtData = JSON.parse(
    fs.readFileSync(path.join(dirname, 'package.json'), 'utf-8')
  )
  const dependancies = txtData.dependencies
  const devDependancies = txtData.devDependencies
  return {
    dependencies: Object.keys(dependancies) ?? [],
    devDependencies: Object.keys(devDependancies) ?? []
  }
}

export default getDependanciesData
