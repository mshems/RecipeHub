<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { collection, addDoc } from 'firebase/firestore'

const router = useRouter()
const form = ref({})

// Add a new document with a generated id.
const addRecipe = async () => {
  const now = new Date()
  const recipe = await addDoc(collection(db, 'recipes'), {
    title: form.value.title,
    link: form.value.link || '',
    notes: form.value.notes || '',
    created: now,
    last_updated: now
  })
  router.push(`/recipes/${recipe.id}`)
}
</script>

<template>
  <q-page padding>
    <q-btn dense flat :to="'/recipes'" icon="mdi-chevron-left" class="q-pr-sm q-pl-none q-mb-sm">Back</q-btn>
    <q-card>
      <q-card-section>
        <q-form class='q-gutter-sm' @submit.prevent="addRecipe">
          <q-input
            required
            outlined
            v-model="form.title"
            label='Recipe Title'
          />
          <q-input
            outlined
            v-model="form.link"
            label='Link'
          />
          <q-input
            outlined
            v-model="form.notes"
            label='Notes'
            type='textarea'
          />
          <q-btn
            type='submit'
            color='primary'
            label='Add Recipe'
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
