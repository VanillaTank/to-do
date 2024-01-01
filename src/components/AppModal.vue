<template>
  <button
    ref="toggleBtn"
    type="button" class="invisible" data-bs-toggle="modal" :data-bs-target="`#${modalId}`"></button>
  <div
:id="modalId"
       class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">{{ modalTitle }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeModal')"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">

          <button
type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  @click="$emit('closeModal')"
          >Закрыть
          </button>

          <button type="button" class="btn btn-primary" @click.stop="$emit('ok')">{{ modalOk }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    modalId: {
      type: String,
      required: true,
    },
    modalTitle: {
      type: String,
      default: '',
    },
    modalOk: {
      type: String,
      default: 'OK',
    },
  },
  emits: ['closeModal', 'ok'],
  methods: {
    open () {
      this.$refs.toggleBtn.click()
    },
    close () {
      this.$refs.toggleBtn.click()
    },
  },
}
</script>

<style>
.modal-body {
  max-height: 450px;
  overflow-y: auto;
}
</style>
