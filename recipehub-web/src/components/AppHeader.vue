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
  router.push('/login')
}
</script>

<template>
  <q-toolbar class="items-center q-px-none">
    <q-icon name="mdi-pot-steam" class="header text-dark" color="primary"/>
    <div class="header text-default no-wrap ellipsis">{{ title }}</div>
    <slot name="left"></slot>
    <q-space/>
    <slot name="right"></slot>
    <div v-if="!hideAccount" class="q-pt-sm">
      <template v-if="!user.authorized">
        <q-btn class="gt-xs" round flat icon="mdi-login" @click="login" no-caps/>
        <q-btn class="lt-sm" size="sm" round flat icon="mdi-login" @click="login" no-caps/>
      </template>
      <template v-else>
        <q-btn :size="$q.screen.gt.xs ? 'lg' : 'md'" round flat icon="mdi-cog" @click="confirm = true" color="secondary"/>
      </template>
    </div>
  </q-toolbar>
  <q-dialog v-model="confirm" :full-width="$q.screen.lt.sm">
    <q-card :style="$q.screen.gt.xs ? 'width: 400px;' : ''">
      <q-card-section class="card-title">
        <div class="row items-center no-wrap">
          <q-icon name="mdi-cog" color="secondary" class="q-mr-sm"/>
          Settings
        </div>
      </q-card-section>
      <q-card-section class="q-pb-md q-pt-sm">
        <q-list separator>
          <q-item class="q-px-none">
            <q-item-section>
              <q-item-label class="item-caption text-secondary">
                Theme
              </q-item-label>
              <q-item-label>
                Use Dark Mode
              </q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-toggle :modelValue="$q.dark.isActive === true" @update:model-value="$q.dark.set($event)"/>
            </q-item-section>
          </q-item>
          <q-item class="q-px-none">
            <q-item-section>
              <q-item-label class="item-caption text-secondary">
                Account
              </q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-btn unelevated label="log out" color="negative" @click="logout" v-close-popup />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
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
  .item-caption {
    font-size: 0.8rem;
  }
}
</style>
