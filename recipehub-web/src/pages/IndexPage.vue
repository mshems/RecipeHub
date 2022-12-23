<template>
  <q-page class="column">
    <template v-for="recipe, i in recipes" :key="i">
      <recipe-card :data="recipe"/>
    </template>
  </q-page>
</template>

<script setup>
import RecipeCard from 'components/RecipeCard.vue'

import { ref } from 'vue'
import { db } from 'boot/firebase'
import { collection, query, getDocs } from 'firebase/firestore'
const recipesRef = collection(db, 'recipes')
const recipesQuery = query(recipesRef)
const recipes = ref([])

const getRecipes = async () => {
  recipes.value = []
  const snapshot = await getDocs(recipesQuery)
  snapshot.forEach(doc => {
    recipes.value.push(doc.data())
  })
}

getRecipes()
</script>
