import getFiles from './get-files-data.js'
import getImportModuleFromFile from './utils/get-import-modules.js'
import isIncludeArray from './utils/is-include-array.js'
import path from 'path'
const getAllUseDependencies = (
  dirname: string,
  extname: string[],
  cb: (moduleName: string) => void
): string[] => {
  const files = [...getFiles(dirname)].filter((item: string) => {
    if (extname.length > 0) {
      if (isIncludeArray(path.extname(item), extname)) {
        return true
      }
     return false
    } else {
     return true
    }
  })
  const tmpArr = []
  const tmpArr2: string[] = []
  for (let i = 0; i < files.length; i++) {
    cb(files[i])
    tmpArr.push(getImportModuleFromFile(files[i]))
  }
  tmpArr.forEach((items) => {
    for (let i = 0; i < items.Module.length; i++) {
      tmpArr2.push(items.Module[i])
    }
  })
  return tmpArr2
}

export default getAllUseDependencies
