import getImportModuleFromFile from './../src/utils/get-import-modules.js'
import path from 'path'
import { dirname } from 'dirname-filename-esm'
console.log(getImportModuleFromFile(path.join(dirname(import.meta), 'plain.js')).Module)