/// <reference path="acorn-loose.d.ts" />
import * as acorn from 'acorn'
import * as acornLoose from 'acorn-loose'
import { dirname } from 'dirname-filename-esm'
import { readFileSync } from 'fs'
import { Merge } from 'type-fest'
type AcornBody = {
    body?: any[]
}
const getImportModuleFromFile = (_dirname = dirname(import.meta)): { Module: string[] } => {
   const file = readFileSync(_dirname, 'utf-8')
   let Ast: Merge<acorn.Node, AcornBody>
   try {
     Ast = acorn.parse(file, { ecmaVersion: 2020, sourceType: 'module' })
   } catch (e) {
     Ast = acornLoose.parse(file, { ecmaVersion: 2020, sourceType: 'module' })
   }
   const importModule: string[] = []
   if (typeof Ast.body !== 'undefined') {
   for (let i = 0; i < Ast.body.length; i++) {
      // import * as hello from 'hello'
      if (Ast.body[i]?.type === 'ImportDeclaration') {
         if (typeof Ast.body[i].source.value !== 'undefined') {
            importModule.push(Ast.body[i].source.value)
         }
      }
      // require('example')
      if (Ast.body[i]?.type === 'VariableDeclaration' && Ast.body[i]?.declarations[0]?.type === 'VariableDeclarator') {
         if (Ast.body[i]?.declarations[0]?.init?.callee?.name === 'require' && typeof Ast.body[i]?.declarations[0]?.init?.arguments !== 'undefined') {
            Ast.body[i].declarations[0].init?.arguments.forEach((items: any[]) => {
                // @ts-expect-error
                if (typeof items.value !== 'undefined') {
                    // @ts-expect-error
                    importModule.push(items.value)
                }
            })
         }
      }
      // import('./example.js')
      if (Ast.body[i]?.type === 'VariableDeclaration' && Ast.body[i]?.declarations[0]?.type === 'VariableDeclarator' && Ast.body[i]?.declarations[0]?.init?.type === 'ImportExpression' && typeof Ast.body[i]?.declarations[0]?.init?.source?.value !== 'undefined') {
          importModule.push(Ast.body[i].declarations[0].init.source.value)
      }
   }
   } else {
    // Error Handling
   }
   return {
      Module: importModule
   }
}

export default getImportModuleFromFile
