<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

const source = ref(props.data.link)
if (source.value) {
  source.value = new URL(props.data.link).hostname
  source.value = source.value.replace('www.', '')
}

</script>

<template>
  <q-card
    class="cursor-pointer q-pb-sm col-12"
    @click="router.push(`/recipes/${data.id}`)"
  >
    <q-img
      v-if="data.image"
      :src="data.image"
      :ratio="16/9"
      no-spinner
    />
    <q-card-section class="card-title q-pt-sm">
      <q-skeleton v-if="loading" type="text" />
      <span v-else>{{ data.title }}</span>
    </q-card-section>

    <q-item v-if="data.link">
      <q-item-section avatar>
        <q-avatar icon="link" color="accent" class="text-white"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Source</q-item-label>
        <q-item-label caption>{{ source }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
