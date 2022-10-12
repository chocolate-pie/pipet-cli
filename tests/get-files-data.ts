import getFiles from './../src/get-files-data.js'
import path from 'path'
import { cwd } from 'process'
console.log(getFiles(cwd()))