const {readFile,writeFile} = require('fs/promises')

;(async ()=> {
  const filepath = process.argv[2]
  const file = (await readFile(filepath)).toString();
  let out = "";
  for (const line of file.split("\n")) {
    out += line + "\n"
  }
  await writeFile(filepath, out.trim() + "\n", {encoding:"utf8"})
})()
