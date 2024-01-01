export type Filter = {
  tagIds: Number[],
  statusIds: Number,
}

export type Status = {
  id: Number,
  title: String,
}

export type Tag = {
  id: Number,
  title: String,
}

export type Task = {
  id: Number,
  title: String,
  description?: String,
  statusId: Number,
  dateDone?: String, // if statusId === 2
  freezeReason?: String, // if statusId === 3
  tagIds?: Number[],
  nextStep?:String, // if tagIds.includes(1)
  whyItUrgent?: String,  // if tagIds.includes(2)
  whyItImportant?: String,  // if tagIds.includes(4)
  whyDontSure?: String,  // if tagIds.includes(5)
  deadline?: String,  // if tagIds.includes(6)
}

export type NewTask = Omit<Task, 'id'>
