const path = require('path')
const fs = require('fs')
class EnvNodePlugin {
    apply (compiler) {
        compiler.hooks.afterEmit.tap('BuildInformationPlugin', (compilation) => {
            const { options: { output: { path: dir, filename } } } = compilation
            const at = path.resolve(dir, filename)
            fs.writeFileSync(at, [
                '#!/usr/bin/env node',
                fs.readFileSync(at)
            ].join('\n\n'))
        })
    }
}

module.exports = EnvNodePlugin
