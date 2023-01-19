<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const user = useUserStore()
defineProps({
  title: {
    type: String,
    required: true
  },
  hideAccount: {
    type: Boolean,
    default: false
  }
})

const login = () => {
  router.push('/login')
}

const logout = () => {
  user.logout()
}
</script>

<template>
  <q-toolbar class="items-center q-px-none">
    <q-icon name="mdi-pot-steam" class="header text-dark" color="primary"/>
    <div class="header text-dark no-wrap ellipsis">{{ title }}</div>
    <slot name="left"></slot>
    <q-space/>
    <slot name="right"></slot>
    <div v-if="!hideAccount" class="q-pt-sm">
      <q-btn v-if="!user.authorized" round flat icon="mdi-login" @click="login" no-caps/>
      <q-btn v-else round unelevated icon="mdi-account" @click="logout" color="primary"/>
    </div>
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
