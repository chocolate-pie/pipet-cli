import getAllUseDependencies from './get-all-use-dependencies.js'
import getDependanciesData from './utils/get-dependencies-data.js'
import isIncludeArray from './utils/is-include-array.js'
import _concat from './utils/concat.js'
import { cwd } from 'process'
import { execSync } from 'child_process'
import { platform } from 'os'
const SMILE_EMOJI = '🥳'
const UNINSTALL_EMOJI = '🎊'
const main = (): void => {
   const deleteDependencies: string[] = []
   var UninstallConsoleData: string[] = []
   // eslint-disable-next-line
   function UninstallSteps () {
    UninstallConsoleData = []
    for (const item of deleteDependencies) {
      UninstallConsoleData.push(`${UNINSTALL_EMOJI} Removed Packages .${item}`)
    }
    console.log(UninstallConsoleData.join('\n'))
   }
   const Dependencies = getAllUseDependencies(cwd(), (FileName) => {
    console.log(`${SMILE_EMOJI} | Get Dependencies ${FileName}`)
   })
   const depData = getDependanciesData(cwd())
   const NormalDepData = depData.dependencies
   const DevDepData = depData.devDependencies
   for (let i = 0; i < NormalDepData.length; i++) {
     if (!isIncludeArray(NormalDepData[i], Dependencies)) {
        deleteDependencies.push(NormalDepData[i])
        if (isIncludeArray(`@types/${NormalDepData[i]}`, _concat(NormalDepData, DevDepData))) {
            deleteDependencies.push(`@types/${NormalDepData[i]}`)
        }
     }
   }
   // eslint-disable-next-line
   console.log(`📢 | Delete Dependencies: ${deleteDependencies.join(' ')}`)
   if (platform() === 'win32') {
     execSync(`pushd ${cwd()} && npm uninstall ${deleteDependencies.join(' ')}`)
   } else {
    execSync(`(cd ${cwd()} ; npm uninstall ${deleteDependencies.join(' ')})`)
   }
   console.log(`${UNINSTALL_EMOJI} | Uninstall Done.`)
}

main()
