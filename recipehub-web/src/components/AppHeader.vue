<script setup>
import { useUserStore } from 'src/stores/user'
const user = useUserStore()
defineProps({
  title: {
    type: String,
    required: true
  },
})

const login = () => {
  user.login()
}

const logout = () => {
  user.logout()
}
</script>

<template>
  <q-toolbar class="items-center">
    <q-icon name="mdi-pot-steam" class="header text-dark" color="primary"/>
    <div class="header text-dark">{{ title }}</div>
    <q-space/>
    <!-- <q-btn v-if="!user.authorized" round flat icon="mdi-login" @click="login" no-caps/> -->
    <!-- <q-btn v-else round unelevated icon="mdi-account" @click="logout" color="primary"/> -->
    <!-- <q-btn round flat icon="mdi-menu"/> -->
  </q-toolbar>
</template>

<style scoped>
.header {
  font-size: 4rem;
  font-weight: 600;
}
.subheader {
  font-size: 2rem;
}
</style>
