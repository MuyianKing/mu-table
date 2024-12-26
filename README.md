<h1 align="center">@muyianking/table</h1>

<p align="center">
单元格宽度根据内容自适应的table组件
</p>

<p align="center">
  <a target="_blank" href="https://www.npmjs.com/package/@muyianking/table" style="text-decoration: none;"><img  src="https://img.shields.io/npm/v/%40muyianking%2Ftable"/></a>
  <a target="_blank" href="https://www.npmjs.com/package/@muyianking/table" style="text-decoration: none;"><img  src="https://img.shields.io/npm/dm/%40muyianking%2Ftable"/></a>
</p>

## 安装

```bash
# npm
npm i @muyianking/table

# yarn
yarn global add @muyianking/table

# pnpm
pnpm i @muyianking/table
```

## 快速开始

### 手动引入

```js
import { MuTable, MuTableColumn } from '@muyianking/table'
import '@muyianking/table/index.css'
```

### 自动引入(unplugin-vue-components)

```js
// vite.config.js
import { MuTableResolver } from '@muyianking/table'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        MuTableResolver(),
      ],
    }),
  ]
})
```

## 贡献

<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/MuyianKing">
                    <img src="https://avatars.githubusercontent.com/u/44827414?v=4" width="100;" alt="MuyianKing"/>
                    <br />
                    <sub><b>MuyianKing</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->
