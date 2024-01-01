// @ts-ignore
import { createStore } from 'vuex'
import type { Tag } from '@/api/types'

export default createStore({
  state () {
    return {
      statuses: [],
      tags: []
    }
  },
  mutations: {
    setTags (state: any, payload: Tag[]) {
      state.tags = payload
    },
    setStatuses (state: any, payload: Tag[]) {
      state.statuses = payload
    },
  }
})
