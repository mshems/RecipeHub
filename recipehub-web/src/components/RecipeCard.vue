<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <q-card>
    <q-img
      v-if="data.image"
      :src="data.image"
      :ratio="16/9"
      spinner-color="primary"
    />
    <q-card-section class="card-title">
      <q-skeleton v-if="loading" type="text" />
      <span v-else>{{ data.title }}</span>
    </q-card-section>
    <q-card-section class="q-py-xs">
      <q-list>
        <q-item v-if="data.link" clickable :href="data.link" target="_blank" class="q-pl-xs">
          <q-item-section avatar>
            <q-avatar icon="link" color="grey" class="text-white"/>
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
        :model-value="data.notes"
        type="textarea"
      />
    </q-card-section>
    <q-card-section class="text-muted text-center">
      Updated
      {{ data.last_updated?.toDate().toLocaleDateString() }}
      {{ data.last_updated?.toDate().toLocaleTimeString() }}
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
</style>
