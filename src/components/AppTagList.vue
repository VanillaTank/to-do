<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>

    <ul
      v-if="!isLoading"
      class="d-flex flex-wrap gap-3 px-0"
    >
      <li
        v-for="tag in tags"
        :key="tag.id"
      >
        <span
          class="btn btn-outline-success btn-sm"
          :class="{'active': selectedTags.includes(tag.id)}"
          @click="onClickTag(tag.id)"
        >
          {{ tag.title }}
        </span>
      </li>
      <li>
        <span
          class="btn btn-outline-success btn-sm"
          @click="reset"
        >
          &times;
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import ApiService from '@/api/ApiService.ts'

export default {
  name: 'AppTagList',
  data() {
    return {
      tags: [],
      isLoading: false,
      selectedTags: [1]
    }
  },
  created() {
    this.$emit('updateSelectedTags', this.selectedTags)

    this.isLoading = true
    ApiService.getTagList().then((tags) => {
      this.tags = tags
      this.isLoading = false
      this.$store.commit('setTags', this.tags)
    })
  },
  methods: {
    onClickTag(tagId) {
      this.selectedTags.includes(tagId)
        ? this.selectedTags.splice(this.selectedTags.indexOf(tagId), 1)
        : this.selectedTags.push(tagId)
      this.$emit('updateSelectedTags', this.selectedTags)
    },
    reset () {
      this.selectedTags = []
      this.$emit('updateSelectedTags', this.selectedTags)
    },
  }
}
</script>
<style></style>
