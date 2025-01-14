import { constants, copyFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import fsExtra from 'fs-extra'

/**
 * 读取json文件转换为对象
 * @param {string} path
 * @returns object
 */
export function getObjectFromJson(path) {
  const data = readFileSync(path)
  return JSON.parse(data)
}

/**
 * 将对象数据写回文件
 * @param {string} outputDir 文件地址
 * @param {object} json_data 对象数据
 */
export function objectToJson(outputDir, json_data) {
  fsExtra.outputFile(outputDir, JSON.stringify(json_data, '', '\t'), 'utf-8')
}

export function getDir(url) {
  return fileURLToPath(url)
}

export function copy(source, target) {
  copyFileSync(
    source,
    target,
    constants.COPYFILE_EXCL,
  )
}
