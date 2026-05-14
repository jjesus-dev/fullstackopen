import { create } from 'zustand'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    add: (blog) => set((state) => state.blogs.concat(blog)),
  },
}))

export const useBlogs = () => useBlogsStore((state) => state.blogs)
export const useBlogsControls = () => useBlogsStore((state) => state.actions)

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    updateMessage: (message) => set(() => ({ notification: message })),
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.notification)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
