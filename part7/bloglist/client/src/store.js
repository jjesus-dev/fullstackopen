import { create } from 'zustand'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    createBlog: (blog) => set((state) => ({ blogs: state.blogs.concat(blog) })),
    setBlogs: (blogs) =>
      set(() => ({
        blogs: blogs,
      })),
  },
}))

export const useBlogs = () => useBlogsStore((state) => state.blogs)
export const useBlogsActions = () => useBlogsStore((state) => state.actions)

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
