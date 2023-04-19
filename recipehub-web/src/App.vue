<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'

const $q = useQuasar()
const store = useUserStore()

$q.dark.set('auto')
store.initialize()
</script>

<template>
  <router-view />
</template>
