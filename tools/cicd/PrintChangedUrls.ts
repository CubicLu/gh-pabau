import { parse } from '@typescript-eslint/parser'
import * as fs from 'fs'
import * as glob from 'glob'
import { dirname } from 'path'
import { dasherize, underscore } from 'inflected'
import * as child_process from 'child_process'

function removeIndexTsx(input: string): string {
  if (input.toLowerCase().endsWith('/index.tsx'))
    return input.substr(0, input.length - '/index.tsx'.length)
  if (input.endsWith('.tsx'))
    return input.substr(0, input.length - '.tsx'.length)

  // Ensure only .module.less files are used
  if (input.endsWith('/index.module.less'))
    return input.substr(0, input.length - '/index.module.less'.length)
  if (input.endsWith('.module.less'))
    return input.substr(0, input.length - '.module.less'.length)
  if (input.endsWith('.less'))
    throw new Error(`You should use LESS Modules instead of ${input}`)

  return input
}

const myArgs = process.argv.slice(2)
const childProcess = child_process.spawnSync('git', [
  'diff',
  '--name-only',
  myArgs[0],
])
const output = []
const lines = childProcess.stdout.toString().split('\n')
let fatalError = false

for (const line of lines) {
  if (line.startsWith('apps/web/pages/')) {
    const path = removeIndexTsx('/' + line.substr('apps/web/pages/'.length))
    output.push(`<${myArgs[1]}${path || '/'}|${path || '/'}>`)
  }

  if (line.startsWith('libs/ui/src/lib/')) {
    let storiesPath = dirname(line) + '/'
    const storiesFound = glob.sync(storiesPath + '**/*.stories.tsx')
    if (!storiesFound?.length) continue
    const ast = parse(fs.readFileSync(storiesFound[0]).toString(), {
      ecmaFeatures: {
        jsx: true,
      },
      range: true,
    })
    let storybookName = ''
    ast.body
      .filter((e) => e.type === 'ExportDefaultDeclaration')
      .map((e) => {
        ;(e as any).declaration.properties
          .filter((e) => e.key?.name === 'title' && e.computed === false)
          .map((e) => {
            storybookName = e.value.value
              .toLowerCase()
              .replace(' ', '')
              .replace('/', '-')
          })
      })
    const namedExportFirst = ast.body
      .filter((e) => e.type === 'ExportNamedDeclaration')
      .find((e) => true)
    if (!namedExportFirst) {
      fatalError = true
      console.error("FATAL: No export found in " + dirname(line) + "/**/*.stories.tsx - please add one ;)")
      continue
    }
    const namedExportRaw = (namedExportFirst as any).declaration
      .declarations?.[0]?.id.name
    const namedExport = dasherize(underscore(namedExportRaw))
    output.push(
      `<${myArgs[2]}/?path=/story/${storybookName}--${namedExport}|${storybookName}--${namedExport}>`
    )
  }
}

if (fatalError) {
  console.log("Fatal errors exist, please fix before continuing.")
  process.exit(1)
}

const deDuped = []
output.forEach((e) => {
  if (!deDuped.includes(e)) deDuped.push(e)
})

if (deDuped.length) {
  console.log('*I have detected the following pages have changed:*')
  console.log(deDuped.join('\n'))
  console.log('\n')
}
