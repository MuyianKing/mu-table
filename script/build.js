import path from 'node:path'
import { copy, exec, getDir, getObjectFromJson, objectToJson } from '@muyianking/build'

const __dirname = getDir(import.meta.url)

// 打包输出路径
const outputDir = path.resolve(__dirname, '../../dist')

function _copy(source, target) {
  copy(path.resolve(__dirname, source), path.resolve(outputDir, target))
}

async function buildLib() {
  // rslib打包
  await exec('vite build')

  // 拷贝READMER.md
  _copy(`../../README.md`, `README.md`)

  // 拷贝LICENSE
  _copy(`../../LICENSE`, `LICENSE`)

  // 生成package.json
  const package_json = getObjectFromJson(path.resolve(__dirname, `../../package.json`))
  const new_package = {}
    ;[
    'name',
    'type',
    'version',
    'exports',
    'main',
    'module',
    'types',
    'dependencies',
    'publishConfig',
    'repository',
    'keywords',
  ].forEach((key) => {
    new_package[key] = package_json[key]
  })

  objectToJson(path.resolve(outputDir, `package.json`), new_package)
}

buildLib()
