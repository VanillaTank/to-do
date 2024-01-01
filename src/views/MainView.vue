<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-11">
        <app-status-list
          @update-selected-status="filter.statusId = $event"
        />

        <app-tag-list
          @update-selected-tags="filter.tagIds = $event"
        />
      </div>
      <div class="col-1">
        <button class="btn btn-primary btn-sm" @click="onAddTaskClick">
          Добавить задачу
        </button>
      </div>
    </div>

    <app-modal
      ref="addOrEditTaskModal"
      modal-id="addOrEditTaskModal"
      :modal-title="modalTitle"
      :modal-ok="modalOk"
      @ok="onOkModal"
      @close-modal="onCloseModal"
    >
      <app-task-form
        :task="taskForEdit"
        @updated-form-data="updatedFormData = $event"
      />
    </app-modal>

    <div v-if="isLoading">Загрузка задач</div>

    <div
      v-else-if="tasks.length && !isLoading"
      class="row row-cols-md-2 g-3 row-cols-sm-1"
    >
      <div
        v-for="task in tasks"
        :key="task.id"
        class="col"
      >
        <app-task
          :key="task.id"
          class="card p-4 h-100"
          :task="task"
          @edit-task="onEditTask(task.id)"
          @update-status="onUpdateStatus"
        />
      </div>
    </div>
    <div v-else-if="!tasks.length && !isLoading">Нет задач по заданным критериям</div>

  </div>
</template>

<script>
import ApiService from '@/api/ApiService.ts'
import AppTagList from '@/components/AppTagList.vue'
import AppTask from '@/components/AppTask.vue'
import AppStatusList from '@/components/AppStatusList.vue'
import AppTaskForm from '@/components/AppTaskForm.vue'
import AppModal from '@/components/AppModal.vue'

import {dequal} from 'dequal'
import { toRaw } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  name: 'MainView',
  components: { AppModal, AppTaskForm, AppStatusList, AppTask, AppTagList },
  data() {
    return {
      tasks: [],
      filter: {
        statusId: 0,
        tagIds: [],
      },
      isLoading: false,
      isAddTaskMode: true,
      taskForEdit: null,
      updatedFormData: null,
    }
  },
  computed: {
    modalTitle() {
      return this.isAddTaskMode ? 'Добавление задачи' : 'Редактирование задачи'
    },
    modalOk() {
      return this.isAddTaskMode ? 'Добавить задачу' : 'Сохранить'
    },
  },
  watch: {
    filter: {
      deep: true,
      handler (newVal) {
        this.isLoading = true
        ApiService.getTasks(newVal).then((tasks) => {
          this.tasks = tasks
          this.isLoading = false
        })
      },
    },
  },
  methods: {
    /**
     * @param {number} taskId
     * @param {number} newStatusId
     */
    onUpdateStatus ({taskId, newStatusId}) {
      ApiService.updateTaskStatus({taskId, newStatusId})
        .then(() => {
          if (newStatusId !== this.filter.statusId) {
            this.tasks = this.tasks.filter((task) => task.id !== taskId)
          }

          toast.success('Сохранено')
        })
        .catch(err => console.log(err))
    },
    onAddTaskClick() {
      this.isAddTaskMode = true
      this.$refs.addOrEditTaskModal.open()
    },
    onEditTask(taskId) {
      this.isAddTaskMode = false
      this.taskForEdit = this.tasks.find(task => task.id === taskId)
      this.$refs.addOrEditTaskModal.open()
    },
    /**
     * @param {string[]} propertyList
     * @param {Object} testingFormData
     */
    isValid (propertyList, testingFormData) {
      return propertyList.every((requiredField => Object.prototype.hasOwnProperty.call(testingFormData, requiredField) && testingFormData[requiredField]))
    },
    onOkModal() {
      const copyTask = structuredClone(toRaw(this.updatedFormData))
      const index = this.tasks.findIndex(task => task.id === copyTask.id)
      if (index >= 0) {
        if (dequal(copyTask, this.tasks[index])) {
          this.$refs.addOrEditTaskModal.close()
          this.taskForEdit = null
          this.updatedFormData = null
          return
        }

        if (!this.isValid(['id', 'title', 'statusId'], copyTask)) {
          toast.success('Заполните обязательные поля')
          return
        }
        ApiService.updateTask(copyTask)
          .then(() => {
            toast.success('Сохранено')

            if (
              (copyTask.statusId !== this.filter.statusId)
              || !this.filter.tagIds.every((tagId => copyTask.tagIds.includes(tagId)))
            ) {
              this.tasks.splice(index, 1)
            } else {
              this.tasks.splice(index, 1, copyTask)
            }
          })
          .catch(err => console.log(err))
      }
      else {
        if (!this.isValid(['title', 'statusId'], copyTask)) {
          toast.success('Заполните обязательные поля')
          return
        }
        ApiService.addTask(copyTask)
          .then(({data}) => {
            const newTaskId = data.taskId
            this.tasks.unshift({ id: newTaskId, ...copyTask })
            toast.success('Добавлено')
          })
          .catch(err => console.log(err))
      }

      this.$refs.addOrEditTaskModal.close()
      this.taskForEdit = null
      this.updatedFormData = null
    },
    onCloseModal() {
      this.taskForEdit = null
      this.updatedFormData = null
    },
  },
}
</script>

<style>

</style>
