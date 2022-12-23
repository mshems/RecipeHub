<script setup>
import { ref } from 'vue'
import { db } from 'boot/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const data = ref({})
const docRef = doc(db, 'recipes', props.id)
const subscribe = () => {
  const unsub = onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        data.value = snapshot.data()
      } else {
        console.log('No such document!')
      }
    },
    (error) => {
      console.log(error)
    }
  )
  return unsub
}
subscribe()
</script>
<template>
  <q-page padding>
    <q-btn dense flat :to="'/recipes'" icon="mdi-chevron-left" class="q-pr-sm q-pl-none q-mb-sm">Back</q-btn>
    <q-card>
      <q-card-section class="card-title">{{ data.title }}</q-card-section>
      <q-card-section class="q-py-xs">
        <q-list>
          <q-item v-if="data.link" :href="data.link" target="_blank">
            <q-item-section avatar>
              <q-icon name="link" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Source</q-item-label>
              <q-item-label caption>{{ data.link }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <q-input
        label="Notes"
        filled
        readonly
        v-model="data.notes"
        type="textarea"
        />
      </q-card-section>
      <q-card-section class="text-muted text-center">
        Updated
        {{ data.last_updated?.toDate().toLocaleDateString() }}
        {{ data.last_updated?.toDate().toLocaleTimeString() }}
      </q-card-section>
    </q-card>
    <div class="q-pt-sm row justify-center">
      <q-btn dense flat color="negative">delete</q-btn>
    </div>
  </q-page>
</template>
