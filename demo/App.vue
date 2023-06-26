<script setup lang="ts">
const list = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <div class="demo">
    <MyComponent :list="list">
      <template #default="{ item }">
        <div class="item">
          {{ item }}
        </div>
      </template>
    </MyComponent>
  </div>
</template>

<style>
.demo {
  text-align: center;
}

.item {
  width: 300px;
  height: 50px;
  background-color: #ccc;
  margin-right: 10px;
}
</style>
