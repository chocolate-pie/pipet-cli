import { dirname } from 'dirname-filename-esm'
import getDirData from './utils/get-dir-data.js'

const getFiles = (_dirname = dirname(import.meta)): any => {
  let FileDataArray: any = []
  let tempArr
  let tempTxt
  let isCompleted = false
  const _file = getDirData(_dirname)
  FileDataArray = _file.filter((items: string) => items !== 'node_modules')

  for (let i = 0; i < FileDataArray.length; i++) {
    if (FileDataArray[i].type === 'folder') {
      FileDataArray[i].visible = false
      FileDataArray[i].completed = false
    } else {
      FileDataArray[i].visible = true
      FileDataArray[i].completed = true
    }
  }

  while (!isCompleted) {
    const tempArray = FileDataArray.filter(
      (items: any) => items.completed === false
    )
    var tempDir
    for (let i = 0; i < tempArray.length; i++) {
      tempDir = getDirData(tempArray[i].path).filter(
        (items: any) => items.File !== 'node_modules'
      )
      tempArr = FileDataArray
      FileDataArray = []
      for (let i = 0; i < tempArr.length; i++) {
        tempTxt = tempArr[i]
        tempTxt.completed = true
        FileDataArray.push(tempTxt)
      }

      for (let i = 0; i < tempDir.length; i++) {
        tempTxt = tempDir[i]
        if (tempDir[i].type === 'folder') {
          tempTxt.visible = false
          tempTxt.completed = false
        } else {
          tempTxt.visible = true
          tempTxt.completed = true
        }

        FileDataArray.push(tempTxt)
      }
    }

    isCompleted = tempArray.length === 0
  }

  return FileDataArray
}

export default getFiles
