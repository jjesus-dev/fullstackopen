import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    createBlog: async (blog) => {
      const newBlog = await blogService.create(blog)
      set((state) => ({ blogs: state.blogs.concat(newBlog) }))
    },
    likeBlog: (id, likes) =>
      set((state) => ({
        blogs: state.blogs.map((b) => {
          // Updates only the property `likes` instead of all the object
          var temp = Object.assign({}, b)
          if (temp.id === id) {
            temp.likes = likes
          }

          return temp
        }),
      })),
    removeBlog: (id) =>
      set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) })),
    setBlogs: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
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
