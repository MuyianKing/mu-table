<script setup lang="ts">
import { ref } from 'vue'
import { MuTable, MuTableColumn } from './core'

const data = ref([{
  name: 'muyian',
  age: 18,
  index: 1,
}])

for (let i = 0; i < 29; i++) {
  data.value.push({
    ...data.value[0],
    index: i + 2,
  })
}

function handleClick(row: any) {
  console.log(row)
}

const show = ref(true)

function addText() {
  data.value[0].name = data.value[0].name + data.value[0].name
}
</script>

<template>
  <div class="button-wrapper">
    <div class="button" @click="show = !show">
      显示控制
    </div>

    <div class="button ml-4" @click="addText">
      改变文本长度
    </div>
  </div>
  <div style="padding: 10px;height: calc(100% - 20px);">
    <mu-table :data>
      <mu-table-column prop="index" label="序号" />
      <mu-table-column v-if="show" prop="name">
        <template #header>
          我的姓名
        </template>
      </mu-table-column>
      <mu-table-column label="年龄">
        <template #default="{ row }">
          age:{{ row.age }}
        </template>
      </mu-table-column>
      <mu-table-column label="操作" min-width="100">
        <template #default="{ row }">
          <span style="margin-right: 10px;user-select: none;">修改</span>
          <span style="color:red;cursor:pointer;user-select: none;" @click="handleClick(row)">删除</span>
        </template>
      </mu-table-column>
    </mu-table>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

.button-wrapper {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 99;
  user-select: none;
}

.ml-4 {
  margin-left: 1em;
}

.button {
  background-color: #409eff;
  padding: 7px 10px;
  color: white;
  display: inline-block;
  border-radius: 5px;
}
</style>
