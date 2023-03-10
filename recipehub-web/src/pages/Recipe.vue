<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { doc, onSnapshot, deleteDoc, setDoc } from 'firebase/firestore'

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

const favorite = async () => {
  await setDoc(docRef, { favorite: true }, { merge: true })
}

const unfavorite = async () => {
  await setDoc(docRef, { favorite: false }, { merge: true })
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
    <q-btn flat :to="'/recipes'" icon="mdi-chevron-left" color="secondary" class="q-pl-xs q-pr-sm q-mb-sm">Recipes</q-btn>

    <div class="row justify-center">
      <q-card class="col" style="max-width: 800px;">
        <q-img
          v-if="data.image"
          :src="data.image"
          :ratio="16/9"
          spinner-color="primary"
        />
        <q-card-section class="card-title">
          <q-skeleton v-if="loading" type="text" />
          <div v-else class="row">
            <div class="col">{{ data.title }}</div>
            <div class="col-shrink">
              <q-btn
                v-if="data.favorite"
                dense
                round
                flat
                color="warning"
                unelevated
                icon="mdi-star"
                @click="unfavorite"
              />
              <q-btn
                v-else
                dense
                round
                flat
                color="grey"
                unelevated
                icon="mdi-star"
                @click="favorite"
              />
              <q-btn
                round
                flat
                color="warning"
                unelevated
                :to="'/recipes/' + props.id + '/edit'"
                icon="mdi-square-edit-outline"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <q-list>
            <q-item v-if="data.link" clickable :href="data.link" target="_blank" class="q-pl-xs">
              <q-item-section avatar>
                <q-avatar icon="link" color="accent" class="text-white"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Source</q-item-label>
                <q-item-label caption class="ellipsis">{{ data.link }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section v-if="data.body != '<br>'" class="q-py-xs">
          <div v-html="data.body" class="q-px-sm recipe"/>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <q-card bordered flat>
            <q-item>
              <q-item-section>
                <q-item-label caption>Notes</q-item-label>
                {{ data.notes }}
              </q-item-section>
            </q-item>
          </q-card>
        </q-card-section>
        <q-card-section class="text-muted text-center q-pb-none">
          Updated
          {{ data.last_updated?.toDate().toLocaleDateString() }}
          {{ data.last_updated?.toDate().toLocaleTimeString() }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat unelevated color="negative" @click="confirm = true">delete</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pt-sm row justify-center q-gutter-sm">
      <!-- <q-btn unelevated :to="`/recipes/${id}/edit`" color="warning">update</q-btn> -->
      <!-- <q-btn flat unelevated color="negative" @click="confirm = true">delete</q-btn> -->
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="mdi-delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Delete this recipe?</span> -->
          <q-item class="q-pa-none">
            <q-item-section avatar>
              <q-avatar icon="mdi-delete" color="negative" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Delete Recipe?</q-item-label>
              <q-item-label caption>Deleted recipes cannot be recovered</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions class="row justify-center q-gutter-sm">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteRecipe" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
  .recipe {
    font-size: 1rem;
  }
</style>
