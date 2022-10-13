import getFiles from './get-files-data.js'
import getImportModuleFromFile from './utils/get-import-modules.js'
const getAllUseDependencies = (dirname: string, cb: (moduleName: string) => void): string[] => {
  const files = getFiles(dirname)
  const tmpArr = []
  const tmpArr2: string[] = []
  for (let i = 0; i < files.length; i++) {
    tmpArr.push(getImportModuleFromFile(files[i]))
  }
  tmpArr.forEach((items) => {
    for (let i = 0; i < items.Module.length; i++) {
      tmpArr2.push(items.Module[i])
    }
  })
  for (const items of files) {
    cb(items)
  }
  return tmpArr2
}

export default getAllUseDependencies
