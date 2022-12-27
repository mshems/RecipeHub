import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    authorized: false,
  }),
  getters: {
  },
  actions: {
    login () {
      this.authorized = true
    },
    logout () {
      this.authorized = false
    }
  }
})
