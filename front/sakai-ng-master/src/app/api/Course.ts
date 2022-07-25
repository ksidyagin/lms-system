export interface Course {
  id?: number
  image_url?: string
  title?: string
  preview_description?: string
  description?: string
  author_id?: number
  author_first_name?: string
  author_second_name?: string
  author_third_name?: string
  auhtor_duty?: string
  author_description?: string
  time?: number
  number_lessons?: number
  user_level?: number
  rating?: number
  trailer_url?: string
  main_topics?: string[]
  sections?: Section[]
}

export interface Section {
  local_id?: number
  title?: string
  description?: string
  modules?: Module[]
}

export interface Module {
  local_id?: number
  title?: string
  type?: string
  content?: string
  time?: number
}

export interface Feedback {
  author_id?: number
  author_name?: string
  description?: string
  mark?: number
}

export interface FeedbackList {
  count?: number
  rating?: number
  feedbacks?: Feedback[]
  list?: Mark[]
}

export interface Mark {
  mark?: number
  count?: number
}