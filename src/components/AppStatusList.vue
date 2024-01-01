<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>

    <ul
      v-if="!isLoading"
      class="d-flex gap-3 px-0"
    >
      <li
        v-for="status in statuses"
        :key="status.id"
      >
        <span
          class="btn btn-outline-primary btn-sm"
          :class="{'active': selectedStatus === status.id}"
          @click="onClickStatus(status.id)"
        >
          {{ status.title }}
        </span>
      </li>
      <li>
        <span
          class="btn btn-outline-primary btn-sm"
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
  name: 'AppStatusList',
  data() {
    return {
      statuses: [],
      isLoading: false,
      selectedStatus: 5, // В работе
    }
  },
  created() {
    this.$emit('updateSelectedStatus', this.selectedStatus)

    this.isLoading = true
    ApiService.getStatuses().then((status) => {
      this.statuses = status
      this.isLoading = false
      this.$store.commit('setStatuses', this.statuses)
    })
  },
  methods: {
    onClickStatus(statusId) {
      if (this.selectedStatus !== statusId) {
        this.selectedStatus = statusId
        this.$emit('updateSelectedStatus', this.selectedStatus)
      }
    },
    reset () {
      this.selectedStatus = null
      this.$emit('updateSelectedStatus', this.selectedStatus)
    },
  }
}
</script>
<style></style>
