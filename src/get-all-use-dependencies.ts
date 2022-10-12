import getFiles from './get-files-data'
import getImportModuleFromFile from './utils/get-import-module'
const getAllUseDependencies = (dirname: string): any => {
  const files = getFiles(dirname).filter(
    (items: any) => items.visible === true
  )
  const tmpArr = []
  const tmpArr2: string[] = []
  for (let i = 0; i < files.length; i++) {
    tmpArr.push(getImportModuleFromFile(files[i].path))
  }
  tmpArr.forEach((items) => {
    for (let i = 0; i < items.module.length; i++) {
      tmpArr2.push(items.module[i])
    }
  })
  return tmpArr2
};

export default getAllUseDependencies
