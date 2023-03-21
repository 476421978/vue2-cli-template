<template>
  <div>
    <h2>vue-virtual-scroll-list</h2>
    <virtual-list
      style="height: 360px; overflow-y: auto"
      scrollable
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import Item from './Item'
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: 'root',
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      itemComponent: Item,
      items: [
        { uid: 'unique_1', text: 'abc' },
        { uid: 'unique_2', text: 'xyz' }
      ]
    }
  },
  created() {
    for (let i = 0; i < 10000; i++) {
      const obj = {
        uid: `${i}_uid`,
        text: i
      }
      this.items.push(obj)
    }
  }
}
</script>
