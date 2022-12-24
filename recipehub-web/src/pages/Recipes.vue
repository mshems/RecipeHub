<template>
  <q-page padding class="column">
    <div class="column items-baseline">
      <div class="text-bold header">Recipes</div>
    </div>
    <q-list class="q-pa-none q-gutter-sm">
      <template v-for="recipe, i in recipes" :key="i">
        <q-card class="cursor-pointer q-pb-sm" @click="router.push(`/recipes/${recipe.id}`)">
          <q-img
            :src="recipe.image || `https://dummyimage.com/600x400/909090/ffffff?text=${recipe.title}`"
            :ratio="16/9"
            no-spinner
          />
          <q-card-section class="card-title q-pt-sm">
            <q-skeleton v-if="loading" type="text" />
            <span v-else>{{ recipe.title }}</span>
          </q-card-section>
          <q-item v-if="recipe.link">
            <q-item-section avatar>
              <q-icon name="link" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Source</q-item-label>
              <q-item-label caption>{{ recipe.link }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </template>
    </q-list>
  </q-page>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" :to="'/recipes/new'"/>
  </q-page-sticky>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'

const router = useRouter()

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
    (err) => {
      console.log(err)
      loading.value = false
      error.value = true
    }
  )
}

subscribe()
</script>

<style scoped>
.header {
  font-size: 4.5rem;
}
.subheader {
  font-size: 2rem;
}
</style>
