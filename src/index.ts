import type { App } from 'vue'
import VueCarousel from './VueCarousel.vue'

function install(app: App) {
  app.component('VueCarousel', VueCarousel)
}

export default {
  install,
}
