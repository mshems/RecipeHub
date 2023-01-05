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
      <div v-else class="row">
        <div class="col">{{ data.title }}</div>
        <q-icon class="col-shrink q-mt-xs" v-if="data.favorite" name="mdi-star" color="warning" />
      </div>
    </q-card-section>
    <q-card-section class="card-subtitle q-pt-sm">
      <span>
        {{ source }}
      </span>
    </q-card-section>
  </q-card>
</template>
