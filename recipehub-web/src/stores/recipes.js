import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    loading: false,
    error: false,
    snapshot: null,
    recipes: [],
    count: 0
  }),
  getters: {
  }
})
