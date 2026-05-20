import { create } from 'zustand'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { saveUser, removeUser } from './services/persistentUser'

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    createBlog: async (blog) => {
      const newBlog = await blogService.create(blog)
      set((state) => ({ blogs: state.blogs.concat(newBlog) }))
    },
    likeBlog: async (id) => {
      const blog = useBlogsStore.getState().blogs.find((b) => b.id === id)
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      })
      set((state) => ({
        blogs: state.blogs.map((b) => {
          // Updates only the property `likes` instead of all the object
          var temp = Object.assign({}, b)
          if (temp.id === id) {
            temp.likes = updatedBlog.likes
          }

          return temp
        }),
      }))
    },
    removeBlog: async (id) => {
      await blogService.remove(id)
      set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }))
    },
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

export const useSessionStore = create((set) => ({
  user: null,
  login: async (username, password) => {
    const loggedUser = await loginService.login({ username, password })
    saveUser(loggedUser)
    set(() => ({ user: loggedUser }))
  },
  logout: () => {
    removeUser()
    set(() => ({ user: null }))
  },
  setUser: (loggedUser) => set(() => ({ user: loggedUser })),
}))

const useUsersStore = create((set) => ({
  users: [],
  actions: {
    setUsers: async () => {
      const users = await userService.getAll()
      set(() => ({ users }))
    },
  },
}))

export const useUsers = () => useUsersStore((state) => state.users)
export const useUsersActions = () => useUsersStore((state) => state.actions)
