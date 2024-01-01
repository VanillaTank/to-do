import axios from 'axios';
import type { Filter, NewTask, Status, Tag, Task } from './types'


const API_URL = 'https://my-little-test.vercel.app'
// const API_URL = 'http://localhost:5000'

export default {
  getStatuses ():Promise<Status[]> {
    return axios.get('./api/statuses.json')
      .then(res => res.data.statuses)
  },

  getTagList ():Promise<Tag[]> {
    return axios.get('./api/tags.json')
      .then(res => res.data.tags)
  },

  getTasks (filter: Filter):Promise<Task[]> {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(','))
      }
      if (Number.isInteger(value)) {
        params.set(key, value.toString())
      }
    })

    return axios.get(`${API_URL}/get-challenges`, { params })
      .then(res => res.data)
  },

  addTask (newTask: NewTask): Promise<Number> {
    return axios.post(`${API_URL}/create-challenge`, newTask)
  },

  updateTask (updatingTask: Task) {
    return axios.post(`${API_URL}/update-challenge?id=${updatingTask.id}`, updatingTask)
  },

  updateTaskStatus ({ taskId, newStatusId }: { taskId: number, newStatusId: number }) {
    return axios.post(`${API_URL}/update-status?id=${taskId}`, {newStatusId})
  }
}

