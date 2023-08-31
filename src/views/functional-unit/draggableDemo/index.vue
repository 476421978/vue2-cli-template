<template>
  <div>
    <h3>Draggable {{ draggingInfo }}</h3>
    <button class="btn btn-secondary" @click="add">Add</button>
    <button class="btn btn-secondary" @click="replace">Replace</button>
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div class="list-group-item" v-for="element in list" :key="element.name">
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
let id = 1
export default {
  components: {
    draggable
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: 'John1', id: 0 },
        { name: 'Joao2', id: 1 },
        { name: 'Jean3', id: 2 }
      ],
      dragging: false
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan ' + id, id: id++ })
    },
    replace: function () {
      this.list = [{ name: 'Edgard', id: id++ }]
    },
    checkMove: function (e) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.list-group-item {
  margin: 20px 0px;
  border: 1px solid rgb(204, 204, 204);
}
</style>
