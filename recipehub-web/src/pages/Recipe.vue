<script setup>
import RecipeCard from 'src/components/RecipeCard.vue'
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const data = ref({})
const loading = ref(true)

const docRef = doc(db, 'recipes', props.id)
const subscribe = () => {
  return onSnapshot(
    docRef,
    (snapshot) => {
      loading.value = true
      if (snapshot.exists()) {
        data.value = snapshot.data()
      } else {
        console.log('No such document!')
      }
      loading.value = false
    },
    (error) => {
      console.log(error)
      loading.value = false
    }
  )
}

const deleteRecipe = async () => {
  await deleteDoc(docRef)
  router.push('/recipes')
}

const unsubscribe = subscribe()
onUnmounted(() => {
  unsubscribe()
})
</script>
<template>
  <q-page padding>
    <q-btn flat :to="'/recipes'" icon="mdi-chevron-left" class="q-pr-sm q-pl-none q-mb-sm" color="primary">Back</q-btn>
    <recipe-card :data="data" :loading="loading" />
    <div class="q-pt-sm row justify-center q-gutter-sm">
      <q-btn unelevated :to="`/recipes/${id}/edit`" color="primary">update</q-btn>
      <q-btn unelevated color="negative" @click="deleteRecipe">delete</q-btn>
    </div>
  </q-page>
</template>
