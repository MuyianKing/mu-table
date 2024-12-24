<script setup lang="ts">
import { ref } from 'vue'
import { MuTable, MuTableColumn } from './core'

const data = ref([{
  name: 'muyian',
  age: 18,
}])

function handleClick(row: any) {
  console.log(row)
}
</script>

<template>
  <div style="padding: 10px;">
    <mu-table :data>
      <mu-table-column prop="name">
        <template #header>
          我的姓名
        </template>
      </mu-table-column>
      <mu-table-column label="年龄">
        <template #default="{ row }">
          age:{{ row.age }}
        </template>
      </mu-table-column>
      <mu-table-column label="操作">
        <template #default="{ row }">
          <span style="margin-right: 10px;user-select: none;">修改</span>
          <span style="color:red;cursor:pointer;user-select: none;" @click="handleClick(row)">删除</span>
        </template>
      </mu-table-column>
    </mu-table>
  </div>
</template>

<style scoped></style>
