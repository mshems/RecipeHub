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

const confirm = ref(false)
const deleteRecipe = async () => {
  await deleteDoc(docRef)
  confirm.value = false
  router.push('/recipes')
}

const unsubscribe = subscribe()
onUnmounted(() => {
  unsubscribe()
})
</script>
<template>
  <q-page padding>
    <div class="row justify-center q-pt-lg">
      <recipe-card class="col" :data="data" :loading="loading" style="max-width: 800px;" />
    </div>
    <div class="q-pt-sm row justify-center q-gutter-sm">
      <q-btn flat :to="'/recipes'" icon="mdi-chevron-left" color="secondary" class="q-pl-sm">Back</q-btn>
      <q-btn unelevated :to="`/recipes/${id}/edit`" color="warning">update</q-btn>
      <q-btn unelevated color="negative" @click="confirm = true">delete</q-btn>
      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Delete this recipe?</span>
        </q-card-section>

        <q-card-actions class="row justify-center q-gutter-sm">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn unelevated label="Delete" color="negative" @click="deleteRecipe" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>
