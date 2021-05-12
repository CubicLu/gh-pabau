// lint-staged.config.js
const micromatch = require('micromatch')
const prettier = require('prettier')

const prettierSupportedExtensions = prettier
  .getSupportInfo()
  .languages.map(({ extensions }) => extensions)
  .flat()
  .filter((v) => !['.jsx', '.js', '.tsx', '.ts'].includes(v))

const addQuotes = (a) => `"${a}"`

module.exports = (allStagedFiles) => {
  const prettierFiles = micromatch(
    allStagedFiles,
    prettierSupportedExtensions.map((extension) => `**/*${extension}`)
  )
  const ret = []
  if (prettierFiles.length > 0)
    ret.push(`prettier --write ${prettierFiles.map(addQuotes).join(' ')}`)

  // const tscFiles = micromatch(allStagedFiles, ['**/*.{tsx,ts}'])
  // if (tscFiles.length > 0) ret.push(`tsc --noEmit ${tscFiles.map(addQuotes).join(' ')}`)

  const eslintFiles = micromatch(allStagedFiles, ['**/*.{tsx,ts,jsx,js}'])
  if (eslintFiles.length > 0)
    ret.push(`eslint --fix ${eslintFiles.map(addQuotes).join(' ')}`)

  return ret
}
