<script setup>
import AppHeader from 'src/components/AppHeader.vue'
import RecipePreview from 'src/components/RecipePreview.vue'

import { ref } from 'vue'
import { db } from 'boot/firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'

const recipesCollection = collection(db, 'recipes')
const recipesQuery = query(recipesCollection, orderBy('last_updated', 'desc'))

const recipes = ref([])
const loading = ref(false)
const error = ref(false)

const subscribe = () => {
  return onSnapshot(
    recipesQuery,
    (snapshot) => {
      loading.value = true
      recipes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      loading.value = false
      error.value = true
    },
    () => {
      loading.value = false
      error.value = true
    }
  )
}

subscribe()
</script>

<template>
  <q-page padding class="column">
    <app-header :title="'Recipes'"/>

    <div class="q-pa-none row q-col-gutter-sm">
      <template v-for="recipe, i in recipes" :key="i">
        <div class="row col-12 col-sm-6 col-md-4 col-lg-3">
          <recipe-preview :data="recipe"/>
        </div>
      </template>
    </div>
  </q-page>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
      vertical-actions-align="right"
      color="positive"
      icon="mdi-plus"
      direction="up"
      size="lg"
    >
      <q-fab-action color="primary" :to="'/recipes/new'" icon="mdi-pot-steam" label="New Recipe" />
    </q-fab>
  </q-page-sticky>
</template>
