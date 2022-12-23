<template>
  <q-page padding class="column q-gutter-sm">
    <h1 class="text-bold">Recipes</h1>
    <template v-for="recipe, i in recipes" :key="i">
      <recipe-card :data="recipe"/>
    </template>
  </q-page>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" :to="'/recipes/new'"/>
  </q-page-sticky>
</template>

<script setup>
import RecipeCard from 'components/RecipeCard.vue'

import { ref } from 'vue'
import { db } from 'boot/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

const recipes = ref([])

const recipesRef = collection(db, 'recipes')
const recipesQuery = query(recipesRef)

const subscribe = () => {
  const unsub = onSnapshot(
    recipesQuery,
    (snapshot) => {
      recipes.value = []
      snapshot.forEach(doc => {
        recipes.value.push({ id: doc.id, ...doc.data() })
      })
    },
    (error) => {
      console.log(error)
    }
  )
  return unsub
}
subscribe()
</script>
