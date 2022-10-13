import { readdirSync } from 'fs'
import path from 'path'
import { dirname } from 'dirname-filename-esm'
const getFiles = (dirName = dirname(import.meta)): any => {
    let files: any[] = []
    const items = readdirSync(dirName, { withFileTypes: true }).filter((items: any) => items.name !== 'node_modules' && items.name !== '.git')
    for (const item of items) {
        if (item.isDirectory()) {
            files = [...files, ...getFiles(`${dirName}/${item.name}`)]
        } else {
            files.push(path.join(dirName, item.name))
        }
    }
    return files
}

export default getFiles
