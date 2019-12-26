import { writeFileSync, unlink, unlinkSync } from "fs"

export function scssFormat(scss: string): RegExpMatchArray | null {
  // let test = scss.replace(/\/\/.*[\r\n]/g, '')
  // test = test.replace(/\/\*[\S|\s]*\*\//g, '')
  // return test.match(/\.\S*[\s]*{/g)
  return `${scss}\n`.replace(/(\/\/.*[\r\n])|(\/\*[\S|\s]*\*\/)/g, '').match(/\.\S*[\s]*{/g)
}

export function getScssKey(keys: RegExpMatchArray) {
  const keysName: string[] = []
  const keysList = [...new Set(keys)]
  keysList.forEach(str => {
    const key = str.replace(/\.|{/g, '')
    keysName.push(`export const ${key.trim()}: StyleProp<TextStyle>`)
  })
  return keysName
}

export function writeFile(content: string, fileName: string) {
  const importRn = `import { StyleProp, TextStyle } from 'react-native'\n`
  const fileContent = `${importRn}\n${content}\n`
  writeFileSync(`${fileName}.d.ts`, fileContent)

}

export function deleteTypeFile(fileName: string) {
  unlinkSync(`${fileName}.d.ts`)
}

