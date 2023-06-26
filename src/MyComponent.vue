<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(defineProps<{
  list: []
  width?: number
  offset?: number
  ratio?: number
  delay?: string
  itemKey?: string
  pauseOnHover?: boolean
}>(), {
  offset: 0, // 动画移动距离偏移
  ratio: 0.03, // 数值越小动画越快，反之越慢
  delay: '1.25s', // 动画延迟
  itemKey: 'id', // 列表循环项key
  pauseOnHover: true, // 鼠标悬浮时暂停动画
})
const emits = defineEmits<{
  (e: 'itemClick', payload: any): void
}>()

const { list, width, offset, ratio, delay, itemKey } = toRefs(props)

const carouselListRef = ref(null)
const carouselItemBoxRefs = ref([])
const carouselItemBoxRefsDefault = computed(() => carouselItemBoxRefs.value[0])

const carouselListWidth = useElementSize(carouselListRef).width //
const carouselItemBoxWidth = useElementSize(carouselItemBoxRefsDefault).width //
const carouselListAnimationDuration = computed(() => `${(carouselItemBoxWidth.value * ratio.value).toFixed(2)}s`) // 根据总宽度计算动画时长
const carouselListTransformValue = computed(() => `translateX(-${carouselItemBoxWidth.value + offset.value}px)`) // 动画移动距离

const isCarouselListOverflow = computed(() => carouselItemBoxWidth.value >= (width?.value ?? carouselListWidth.value)) // 是否需要滚动
const isCarouselListAnimationPulse = ref(false) // 跑马灯动画暂停
const carouselListClass = computed(() => ({
  'vue-carousel-list_overflow': isCarouselListOverflow.value,
  'animation-pause': isCarouselListAnimationPulse.value,
}))

const triggerEvent = (key: any, payload: any) => {
  emits(key, payload)
}
</script>

<template>
  <div class="vue-carousel">
    <div
      ref="carouselListRef"
      class="vue-carousel-list"
      :class="carouselListClass"
      @mouseenter.stop="pauseOnHover && (isCarouselListAnimationPulse = true)"
      @mouseleave.stop="pauseOnHover && (isCarouselListAnimationPulse = false)"
    >
      <div
        v-for="i in isCarouselListOverflow ? 2 : 1"
        :key="i"
        ref="carouselItemBoxRefs"
        class="vcl-item-box"
        :class="[i === 1 ? 'vcl-item-box_default' : 'vcl-item-box_repeat']"
      >
        <div
          v-for="(item, index) in list"
          :key="item[itemKey] ?? index"
          class="vcl-item"
          @click.stop="triggerEvent('itemClick', item)"
        >
          <slot :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-carousel {
  overflow: hidden;
}

.vue-carousel-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.vue-carousel-list_overflow {
  animation: carousal v-bind(carouselListAnimationDuration) v-bind(delay) linear infinite;
}

.vcl-item-box {
  flex: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

}

.vcl-item {
  flex: none;

}

.animation-pause {
  animation-play-state: paused;
}

@keyframes carousal {
  from {
    transform: translateX(0);
  }
  to {
    transform: v-bind(carouselListTransformValue);
  }
}
</style>
