<script setup lang="ts">
import type { Align } from '@type/index'
import { MuTable, MuTableColumn } from '@/core'
import { ref } from 'vue'

const data = ref([{
  gc: '一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子',
  yc: '郭兰英',
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
  data.value[0].gc = data.value[0].gc.length > 30 ? '一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子' : '一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子;看惯了船上的白帆姑娘好像花儿一样小伙儿心胸多宽广为了开辟新天地唤醒了沉睡的高山让那河流改变了模样;一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子;看惯了船上的白帆姑娘好像花儿一样小伙儿心胸多宽广为了开辟新天地唤醒了沉睡的高山让那河流改变了模样'
}

const maxHeight = ref('')
function setMaxHeight() {
  maxHeight.value = maxHeight.value ? '' : '400'
}

const align = ref<Align>('center')
const _align: Align[] = ['center', 'left', 'right']
let align_count = 2
function setAlign() {
  align.value = _align[align_count++ % 3]
}

const noBorder = ref(false)
function setBorder() {
  noBorder.value = !noBorder.value
}

const scrollbarAlwaysOn = ref(false)
function setScrollBar() {
  scrollbarAlwaysOn.value = !scrollbarAlwaysOn.value
}

const rowClass = ref<((row: any) => string) | undefined>(undefined)
function setRowClass() {
  rowClass.value = rowClass.value ? undefined : (row: any) => row.index % 3 === 0 ? 'purple' : (row.index % 2 ? 'green' : '')
}

const stripe = ref(false)
function setStripe() {
  stripe.value = !stripe.value
}

const nowrap = ref(false)
function setNowrap() {
  data.value[0].gc = '一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子;看惯了船上的白帆姑娘好像花儿一样小伙儿心胸多宽广为了开辟新天地唤醒了沉睡的高山让那河流改变了模样；一条大河波浪宽风吹稻花香两岸,我家就在岸上住听惯了艄公的号子;看惯了船上的白帆姑娘好像花儿一样小伙儿心胸多宽广为了开辟新天地唤醒了沉睡的高山让那河流改变了模样'

  nowrap.value = !nowrap.value
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

    <div class="button ml-4" @click="setAlign">
      对齐方式{{ align }}
    </div>

    <div class="button ml-4" @click="setMaxHeight">
      最大高度{{ maxHeight }}
    </div>

    <div class="button ml-4" @click="setBorder">
      边框
    </div>

    <div class="button ml-4" @click="setScrollBar">
      滚动条
    </div>

    <div class="button ml-4" @click="setStripe">
      斑马纹
    </div>

    <div class="button ml-4" @click="setRowClass">
      自定义class
    </div>
    <div class="button ml-4" @click="setNowrap">
      内容{{ nowrap ? '' : '不' }}换行
    </div>
  </div>
  <div style="height: 400px;">
    hhh
  </div>
  <div style="padding: 10px;height: calc(100% - 20px);">
    <mu-table :data :max-height :align :no-border :stripe :scrollbar-always-on :row-class :nowrap>
      <mu-table-column prop="index" label="序号" />
      <mu-table-column v-if="show" prop="gc">
        <template #header>
          歌词
        </template>
      </mu-table-column>
      <mu-table-column label="原唱">
        <template #default="{ row }">
          {{ row?.yc }}
        </template>
      </mu-table-column>
      <mu-table-column label="操作" min-width="100" align="center">
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
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  z-index: 99;
  user-select: none;
  padding: 10px;
  box-shadow: 0 0 15px gray;
  background-color: white;
  border-radius: 5px;
  width: max-content;
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
  cursor: pointer;
}

.button:hover {
  background-color: #a7cff8;
}

.purple {
  background-color: #fdf6ec;
}

.green {
  background-color: #f0f9eb;
}
</style>
