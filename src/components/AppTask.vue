<template>
  <div v-if="isStateReady">
    <div class="d-flex justify-content-between align-top">
      <h6>{{ task.title }}</h6>
      <button
        class="btn btn-outline-secondary btn-sm"
        @click="$emit('editTask',  task.id)"
      >
        &#128393;
      </button>
    </div>

    <div v-if="task.description" class="mb-2">
      <div class="fw-semibold">Описание:</div>
      {{ task.description }}
    </div>

    <div class="mb-2">
      <div class="fw-semibold">Следующий шаг:</div>
      {{ task.nextStep }}
    </div>

    <div class="mb-3">
      <div class="fw-semibold">Тэги:</div>
      <div
        v-if="task.tagIds?.length"
        class="d-flex gap-2 flex-wrap">
        <div
          v-for="tagId in task.tagIds"
          :key="tagId"
          class="badge text-bg-success"
        >
          <span>{{ tags.find(tag => tag.id === tagId).title }}</span>
        </div>
      </div>
      <div v-else>Тэги не указаны</div>
    </div>

    <div class="mb-2">
      <span class="fw-semibold">Статус: </span>
      <app-dropdown
        class="d-inline"
        :items="statuses"
        :preselected-item-id="task.statusId"
        @select="$emit('updateStatus', { taskId: task.id, newStatusId: $event })"
      />
    </div>

    <div v-if="task.dateDone" class="mb-2">
      <span class="fw-semibold">Дата выполения:</span> {{ task.dateDone }}
    </div>

    <div v-if="task.freezeReason" class="mb-2">
      <div class="fw-semibold">Причина переноса в туманное будущее:</div>
      {{ task.freezeReason }}
    </div>

    <div v-if="task.whyItUrgent" class="mb-2">
      <div class="fw-semibold">Причина срочности:</div>
      {{ task.whyItUrgent }}
    </div>

    <div v-if="task.whyItImportant" class="mb-2">
      <div class="fw-semibold">Почему это так важно?</div>
      {{ task.whyItImportant }}
    </div>

    <div v-if="task.whyDontSure" class="mb-2">
      <div class="fw-semibold">Причина неувренности:</div>
      {{ task.whyDontSure }}
    </div>

    <div v-if="task.deadline" class="mb-2">
      <span class="fw-semibold">Дедлайн:</span> {{ task.deadline }}
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import AppDropdown from '@/components/AppDropdown.vue'

export default {
  name: 'AppTask',
  components: { AppDropdown },
  props: {
    task: {
      type: Object, // Task
      required: true
    }
  },
  computed: {
    ...mapState({
      statuses(state) {
        return state.statuses
      },
      tags(state) {
        return state.tags
      }
    }),
    isStateReady() {
      return this.statuses.length && this.tags.length
    }
  },
}
</script>
<style></style>
