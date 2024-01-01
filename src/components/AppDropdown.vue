<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {{ dropdownTitle }}
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="item in items"
        :key="item.id"
      >
        <button
          class="dropdown-item btn-sm"
          type="button"
          :class="{'active': item.id === selectedItemId}"
          @click="onClickItem(item.id)"
        >{{ item.title}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppDropdown',
  props: {
    items: {
      type: Array,
      required: true,
    },
    preselectedItemId: {
      type: Number,
      default: -1,
    },
    dropdownTitleText: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      selectedItemId: -1
    }
  },
  computed: {
    dropdownTitle () {
      return this.items.find(item => item.id === this.selectedItemId)?.title || this.dropdownTitleText || 'Выберите значение'
    }
  },
  mounted() {
    if (this.preselectedItemId !== -1) {
      this.selectedItemId = this.preselectedItemId
    }
  },
  methods: {
    onClickItem (itemId) {
      if (this.selectedItemId !== itemId) {
        this.selectedItemId = itemId
        this.$emit('select', itemId)
      }
    }
  }

}
</script>
