import getAllUseDependencies from './get-all-use-dependencies.js'
import getDependanciesData from './utils/get-dependencies-data.js'
import isIncludeArray from './utils/is-include-array.js'
import _concat from './utils/concat.js'
import { cwd } from 'process'
import { execSync } from 'child_process'
import { platform } from 'os'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import minimist from 'minimist'
const SMILE_EMOJI = '🥳'
const UNINSTALL_EMOJI = '🎊'
const START_EMOJI = '😎'
const ANSI_CLOSE_KEY = '\x1b[0m'
const ANSI_RED_KEY = '\x1b[31m'
const main = (): void => {
  const PIPET_ARGV = minimist(process.argv.slice(2))
  var uninstaller = 'npm'
  var ignoreFilePath = './.pipetignore'
  var ignoreData: string[] = []
  var extNameDep: string[] = []
  if (typeof PIPET_ARGV.uninstaller !== 'undefined') {
    if (/(npm|yarn)/.test(PIPET_ARGV.uninstaller)) {
      uninstaller = PIPET_ARGV.uninstaller
    }
  }
  if (typeof PIPET_ARGV['ignore-file-path'] !== 'undefined') {
    ignoreFilePath = PIPET_ARGV['ignore-file-path']
  }
  if (existsSync(path.resolve(cwd(), ignoreFilePath))) {
    ignoreData = readFileSync(
      path.resolve(cwd(), ignoreFilePath),
      'utf-8'
    ).split(/\r\n|\n/)
  }
  if (typeof PIPET_ARGV.ext !== 'undefined') {
    const splitArray = PIPET_ARGV.ext.split(',')
    for (const splitValue of splitArray) {
      extNameDep.push(splitValue.trim())
    }
  }
  try {
    console.log(`${START_EMOJI} Start Pipet CLI`)
    const deleteDependencies: string[] = []
    // eslint-disable-next-line
    const Dependencies = getAllUseDependencies(cwd(), extNameDep, (FileName) => {
      console.log(`${SMILE_EMOJI} | Get Dependencies ${FileName}`)
    })
    const depData = getDependanciesData(cwd())
    const NormalDepData = depData.dependencies
    const DevDepData = depData.devDependencies
    for (let i = 0; i < NormalDepData.length; i++) {
      if (!isIncludeArray(NormalDepData[i], Dependencies)) {
        if (!isIncludeArray(NormalDepData[i], ignoreData)) {
          deleteDependencies.push(NormalDepData[i])
          if (
            isIncludeArray(
              `@types/${NormalDepData[i]}`,
              _concat(NormalDepData, DevDepData)
            )
          ) {
            deleteDependencies.push(`@types/${NormalDepData[i]}`)
          }
        }
      }
    }
    // eslint-disable-next-line
    console.log(
      `📢 | Delete Dependencies: ${
        deleteDependencies.length > 0 ? deleteDependencies.join(' ') : 'none'
      }`
    )
    if (deleteDependencies.length > 0) {
      if (platform() === 'win32') {
        execSync(
          `pushd ${cwd()} && ${
            uninstaller === 'npm' ? 'npm uninstall' : 'yarn remove'
          } ${deleteDependencies.join(' ')}`
        )
      } else {
        execSync(
          `(cd ${cwd()} ; ${
            uninstaller === 'npm' ? 'npm uninstall' : 'yarn remove'
          } ${deleteDependencies.join(' ')})`
        )
      }
      console.log(`${UNINSTALL_EMOJI} | Uninstall Done.`)
    }
  } catch (e: any) {
    console.log(`${ANSI_RED_KEY}Error:${ANSI_CLOSE_KEY} ${e as string}`)
  }
}

main()
