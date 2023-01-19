<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const user = useUserStore()

</script>

<template>
  <q-layout view="lHh Lpr fFf">
    <q-page-container>
      <q-banner v-if="!user.authorized" rounded inline-actions class="q-ma-lg text-white bg-primary">
        Please log in.
        <template v-slot:action>
          <q-btn
            unelevated
            label="Sign In"
            color="white"
            text-color="primary"
            @click="router.push('/login')"
          />
        </template>
      </q-banner>
      <template v-else>
        <router-view />
      </template>
    </q-page-container>
  </q-layout>
</template>
