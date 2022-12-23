<script setup>
import { useRouter } from 'vue-router'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const router = useRouter()
</script>
<template>
  <q-card class="clickable-card" @click="router.push(`/recipes/${data.id}`)">
    <q-card-section class="card-title">{{ data.title }}</q-card-section>
    <q-card-section v-if="data.link" class="q-py-xs">
      <q-list>
        <q-item>
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
    <q-card-section v-else class="card-subtitle">{{ data.title }}</q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
</style>
