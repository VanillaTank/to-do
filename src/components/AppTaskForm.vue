<template>
  <form>
    <label class="w-100 mb-2">
      Название: <span class="text-danger">*</span>
      <input
        v-model="formData.title"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      >
    </label>

    <label class="w-100 mb-2">
      Описание:
      <textarea
        v-model="formData.description"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      />
    </label>

    <label class="w-100 mb-2">
      Следующий шаг:
      <input
        v-model="formData.nextStep"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      >
    </label>

    <div class="mb-2">
      Тэги:
      <div
        v-for="tagId in formData.tagIds"
        :key="tagId"
        class="badge text-bg-success d-inline-flex gap-1 justify-content-between"
      >
        <span>{{ tags.find(tag => tag.id === tagId).title }}</span>
        <span
          class="cursor-pointer"
          @click="deleteTag(tagId)"
        >&times;</span>
      </div>

      <app-dropdown
        v-if="filteredTags.length"
        class="d-inline"
        :items="filteredTags"
        dropdown-title-text="+"
        @select="onAddTag"
      />
    </div>

    <div class="mb-2">
      <span class="fw-semibold">Статус: </span>
      <app-dropdown
        class="d-inline"
        :items="statuses"
        :preselected-item-id="formData.statusId"
        @select="onStatusSelect"
      />
    </div>

    <label
      v-if="formData.tagIds.includes(2)"
      class="w-100 mb-2"
    >
      Причина срочности:
      <input
        v-model="formData.whyItUrgent"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      >
    </label>

    <label
      v-if="formData.tagIds.includes(4)"
      class="w-100 mb-2"
    >
      Почему это так важно?
      <input
        v-model="formData.whyItImportant"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      >
    </label>

    <label
      v-if="formData.tagIds.includes(5)"
      class="w-100 mb-2"
    >
      Причина неувренности:
      <input
        v-model="formData.whyDontSure"
        class="form-control form-control-sm"
        type="text"
        placeholder="Введите текст"
      >
    </label>

    <label
      v-if="formData.tagIds.includes(6)"
      class="w-100 mb-2"
    >
      Дедлайн:
      <input
        v-model="formData.deadline"
        class="form-control form-control-sm"
        type="text"
        placeholder="DD.MM.YYYY"
      >
    </label>
  </form>
</template>
<script>
import AppDropdown from '@/components/AppDropdown.vue'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'AppTaskForm',
  components: { AppDropdown },
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  emits: ['updatedFormData'],
  data() {
    return {
      formData: {},
    }
  },
  computed: {
    ...mapState({
      statuses(state) {
        return state.statuses
      },
      tags(state) {
        return state.tags
      },
    }),
    filteredTags () {
      return this.tags.filter(tag => !this.formData.tagIds.includes(tag.id))
    },
  },
  watch: {
    formData: {
      deep: true,
      handler(newVal) {
        this.$emit('updatedFormData', newVal)
      },
    },
    task: {
      immediate: true,
      handler(newVal) {
        this.setInitFormData(newVal)
      },
    },
  },
  methods: {
    setInitFormData(newVal) {
      this.formData = {
        ...(newVal?.id && {id: newVal.id}),
        title: newVal?.title || '',
        description: newVal?.description || '',
        nextStep: newVal?.nextStep || '',
        // eslint-disable-next-line no-unsafe-optional-chaining
        tagIds: newVal?.tagIds.length ? [...this.task?.tagIds] : [],
        statusId: newVal?.statusId || 1,
        freezeReason: newVal?.freezeReason || '',
        whyItUrgent: newVal?.freezeReason || '',
        whyItImportant: newVal?.whyItImportant || '',
        whyDontSure: newVal?.whyDontSure || '',
        deadline: newVal?.deadline || '',
        dateDone: newVal?.dateDone || '',
      }
    },
    deleteTag(tagId) {
      const index = this.formData.tagIds.indexOf(tagId)
      this.formData.tagIds.splice(index, 1)
    },
    onAddTag (tagId) {
      this.formData.tagIds.push(tagId)
    },
    onStatusSelect (statusId) {
      this.formData.statusId = statusId
      this.formData.dateDone = moment().format('DD.MM.YYYY hh:mm')
    },
  },
}
</script>
<style></style>
