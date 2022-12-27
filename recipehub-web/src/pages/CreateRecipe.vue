<script setup>
import AppHeader from 'src/components/AppHeader.vue'

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
    image: form.value.image || '',
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
    <app-header :title="'Create'"/>

    <q-card>
      <q-card-section>
        <q-form class='q-gutter-sm' @submit.prevent="addRecipe">
          <q-input
            clearable
            required
            outlined
            v-model="form.title"
            label='Recipe Title'
            input-class="text-bold"
          />
          <q-input
            clearable
            outlined
            v-model="form.image"
            label='Image'
          />
          <q-input
            clearable
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
          <div class="row">
            <q-space/>
            <q-btn
            type='submit'
            color='positive'
            label='Add Recipe'
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
