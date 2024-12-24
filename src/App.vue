<script setup lang="ts">
import { ref } from 'vue'
import { MuTable, MuTableColumn } from './core'

const data = ref([{
  name: 'muyian',
  age: 18,
}])
</script>

<template>
  <div style="padding: 10px;">
    <mu-table :data>
      <mu-table-column label="姓名" prop="name" />
      <mu-table-column label="年龄" prop="age" />
      <mu-table-column label="操作" />
    </mu-table>
  </div>
</template>

<style scoped></style>
