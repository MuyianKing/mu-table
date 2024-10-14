<script setup lang="ts">
import { ref } from 'vue'
import { MuTable, MuTableColumn } from './core'

const data = ref([{
  name: 'muyian',
}])
</script>

<template>
  <mu-table :data>
    <mu-table-column label="姓名" prop="name" />
  </mu-table>
</template>

<style scoped></style>
