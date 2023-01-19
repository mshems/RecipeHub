<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const user = useUserStore()
</script>

<template>
  <q-layout view="lHh Lpr fFf">
    <q-page-container>
      <template v-if="user.authorized">
        <router-view />
      </template>
      <q-banner rounded inline-actions class="q-ma-lg text-white bg-primary">
        Please log in.
        <template v-slot:action>
          <q-btn
            label="Sign In"
            color="white"
            text-color="primary"
            @click="router.push('/login')"
          />
        </template>
      </q-banner>
    </q-page-container>
  </q-layout>
</template>
