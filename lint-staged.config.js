// lint-staged.config.js
const micromatch = require('micromatch')
const prettier = require('prettier')
const { execSync } = require('child_process')

const prettierSupportedExtensions = prettier
  .getSupportInfo()
  .languages.map(({ extensions }) => extensions)
  .flat()
  .filter((v) => !['.jsx', '.js', '.tsx', '.ts'].includes(v))

const addQuotes = (a) => `"${a}"`

module.exports = (allStagedFiles) => {
  const ret = []
  
  let isInMerge = false
  try {
    execSync("git rev-parse -q --verify MERGE_HEAD", { stdio: "inherit" })
    isInMerge = true
  } catch {
    console.log("exec sync failed, non-merge commit detected")
  }
  if (isInMerge) {
    console.log("Skipping due to being inside a merge")
    return
  }

  // The master default is eslint. Which includes prettier.
  const eslintFiles = micromatch(allStagedFiles, ['**/*.{tsx,ts,jsx,js}'])
  if (eslintFiles.length > 0) {
    ret.push(`eslint --fix ${eslintFiles.map(addQuotes).join(' ')}`)
  }

  // Now for each unmatched file, see if prettier can handle it
  for (const file of allStagedFiles.filter(e => eslintFiles.includes(e))) {
    const prettierFiles = micromatch(
      allStagedFiles,
      prettierSupportedExtensions.map((extension) => `**/*${extension}`)
    )
    const ret = []
    if (prettierFiles.length > 0)
      ret.push(`prettier --write ${prettierFiles.map(addQuotes).join(' ')}`)
  }

  return ret
}
