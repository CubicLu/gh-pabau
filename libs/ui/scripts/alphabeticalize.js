const path = require('path')
const fs = require('fs')

const TARGET = path.resolve(__dirname, '..', 'src', 'index.ts')

const content = fs.readFileSync(TARGET, 'utf8')

const result =
  Array.from(new Set(content.split('\n')).keys())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('\n') + '\n'
fs.writeFileSync(TARGET, result)
if (content != result)
  throw new Error(
    'ui-lib: index.ts was not alphabetical, this has been corrected. please make sure to add it back to your commit.'
  )
