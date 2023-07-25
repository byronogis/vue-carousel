<script setup lang="ts">
import { ref, watch } from 'vue'
import JSON5 from 'json5'
import { name, version } from '../package.json'

const itemClick = (payload) => {
  console.warn('itemClick', payload)
}

const componentProps = ref({})
const boxWidth = ref('70')
const boxUnit = ref('%')

const propsRaw = ref(`{
  list: [1, 2, 3, 4, 5, 6],
  // offset: -50,
  ratio: 0.01,
  delay: '1s',
  itemKey: 'id',
  // pauseOnHover: false
}`)

watch(propsRaw, (val) => {
  try {
    componentProps.value = JSON5.parse(val)
  }
  catch (error) {
    console.log(error)
  }
}, { immediate: true })
</script>

<template>
  <div class="demo">
    <div class="box">
      <VueCarousel v-bind="componentProps" @itemClick="itemClick">
        <template #default="{ item }">
          <div class="item" @click="itemClick(111111)">
            {{ item }}
          </div>
        </template>
      </VueCarousel>
    </div>

    <div class="props">
      <h4>You can adjust props:</h4>
      <textarea id="" v-model="propsRaw" name="" cols="30" rows="10" />

      <h4>You can adjust carousel area width:</h4>
      <input v-model="boxWidth" type="number" class="width">
      <input v-model="boxUnit" type="text" placeholder="unit" class="unit">
    </div>
  </div>

  <footer class="footer">
    <a :href="`https://www.npmjs.com/package/${name}`" target="_blank">{{ name }}@{{ version }}</a>
  </footer>
</template>

<style>
.demo {
  text-align: center;
}

.box {
  width: v-bind(boxWidth + boxUnit);
  margin: 0 auto;
  border: 2px solid #f00;
}

.props {
  display: inline-block;
  margin-top: 50px;
  text-align: left;
}

.width {
  width: 100px;
}

.unit {
  margin-left: 10px;
  width: 25px;
}

.item {
  width: 300px;
  height: 50px;
  background-color: #ccc;
  margin-right: 10px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
