import { dirname } from 'dirname-filename-esm'
import { readdirSync, statSync } from 'fs'
import path from 'path'
const getDirData = (_dirname = dirname(import.meta)): any => {
  let _files: string[] = []
  const tmpArray: any = []
  const dir = readdirSync(_dirname).filter((items) => items !== 'node_modules' && items !== 'bower_components' && items !== '.git')
  _files = dir
  for (let i = 0; i < _files.length; i++) {
    tmpArray.push({
      File: _files[i],
      path: path.join(_dirname, _files[i]),
      //  type: _files[i].split(".").length === 1 ? "folder" : "file",
      type: statSync(path.join(_dirname, _files[i])).isDirectory()
        ? 'folder'
        : 'file'
    })
  }
  return tmpArray
}

export default getDirData
