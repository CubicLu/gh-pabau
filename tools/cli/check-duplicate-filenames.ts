import * as recursiveReaddir from 'recursive-readdir'

;(async () => {
  console.table({cwd:process.cwd()})

  // Detect case-insensitive duplicates (thanks FAT).
  {
    const files = await new Promise<string[]>((resolve, reject) => {
      recursiveReaddir('.', ["node_modules", "dist"], function (err, files) {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      });
    })
    console.log(`Found ${files.length} files.`)
    let wasError = false
    ;(files as string[]).reduce<string[]>((a, c) => {
    const s = c.toLowerCase();
    if (!a.includes(s)) return [...a, s]
    console.error(`Woah, found 2 files with same name: ${c}`)
    wasError = true
    return a
  }, [])
    if (wasError) throw new Error("Duplicate files found (but different casing). Bless our fellow Windows users and delete one or the other.")
    else console.log("All OK.")

  }

})()
