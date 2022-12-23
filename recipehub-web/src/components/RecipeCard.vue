<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <q-card>
    <q-card-section class="card-title">{{ data.title }}</q-card-section>
    <q-card-section>{{ data.body }}</q-card-section>
    <q-card-section>{{ data }}</q-card-section>
  </q-card>
</template>
