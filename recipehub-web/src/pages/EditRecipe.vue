<script setup>
import AppHeader from 'src/components/AppHeader.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const loading = ref(false)

const form = ref({})
const docRef = doc(db, 'recipes', props.id)
const getRecipe = async () => {
  loading.value = true
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    form.value = docSnap.data()
  } else {
    console.log('No such document!')
  }
  loading.value = false
}

const save = async () => {
  await setDoc(docRef, {
    title: form.value.title,
    image: form.value.image,
    link: form.value.link,
    notes: form.value.notes,
    last_updated: new Date(),
  })
  router.push(`/recipes/${props.id}`)
}

onMounted(() => {
  getRecipe()
})
</script>

<template>
  <q-page padding>
    <app-header :title="'Update'"/>

    <q-form @submit.prevent="save">
      <q-card>
        <q-card-section class="card-title">
          <q-input required clearable outlined v-model="form.title" label="Title" input-class="text-bold" />
        </q-card-section>
        <q-card-section class="column q-gutter-sm">
          <q-input clearable outlined v-model="form.image" label="Image" />
          <q-input clearable outlined v-model="form.link" label="Link" />
          <q-input clearable outlined type="textarea" v-model="form.notes" label="Notes" />
        </q-card-section>
      </q-card>
      <div class="q-pt-sm row justify-center q-gutter-sm">
        <q-btn unelevated color="positive" type="submit">save</q-btn>
        <q-btn flat color="negative" @click="router.push(`/recipes/${id}`)">cancel</q-btn>
      </div>
    </q-form>
  </q-page>
</template>
