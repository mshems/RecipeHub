<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'

const $q = useQuasar()
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

const confirm = ref(false)
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
      <template v-if="!user.authorized">
        <q-btn class="gt-xs" round flat icon="mdi-login" @click="login" no-caps/>
        <q-btn class="lt-sm" size="sm" round flat icon="mdi-login" @click="login" no-caps/>
      </template>
      <template v-else>
        <q-btn class="gt-xs" round unelevated icon="mdi-account" @click="confirm = true" color="primary"/>
        <q-btn class="lt-sm" size="sm" round unelevated icon="mdi-account" @click="confirm = true" color="primary"/>
      </template>
    </div>
  </q-toolbar>
  <q-dialog v-model="confirm" :full-width="$q.screen.lt.md">
    <q-card :style="$q.screen.gt.sm ? 'width: 300px;' : ''">
      <q-card-section class="card-title">
        <div class="row items-center no-wrap">
          <q-icon class="q-mr-sm" name="mdi-account" color="accent"/>
          Account
        </div>
      </q-card-section>
      <q-card-section class="q-py-sm">
        <q-item class="q-pa-none">
          <q-item-section>
            <q-item-label caption>Email</q-item-label>
            <q-item-label>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="close" color="grey-6" v-close-popup />
        <q-btn flat label="log out" color="negative" @click="logout" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.header {
  font-size: 4rem;
  font-weight: 600;
}
.subheader {
  font-size: 2rem;
}

@media only screen and (max-width: 600px) {
  .header {
    font-size: 3rem;
    font-weight: 600;
  }
}
</style>
