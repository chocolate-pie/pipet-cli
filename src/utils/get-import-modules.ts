/// <reference path="acorn-loose.d.ts" />
/// <reference path="acorn-walk.d.ts" />
import * as acorn from 'acorn'
import * as acornLoose from 'acorn-loose'
import * as acornWalk from 'acorn-walk'
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
   acornWalk.simple(Ast, {
      CallExpression (node: any) {
        if (node.callee.name === 'require' && typeof node.arguments !== 'undefined') {
         node.arguments.forEach((item: { value: string }) => {
            importModule.push(item.value)
         })
        }
      },
      ImportDeclaration (node: any) {
        if (typeof node.source.value !== 'undefined') {
         importModule.push(node.source.value)
        }
      }
   })

   return {
      Module: importModule
   }
}

export default getImportModuleFromFile
