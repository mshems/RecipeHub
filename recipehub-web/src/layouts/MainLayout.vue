<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          RecipeHub
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <template v-for="link, i in links" :key="i">
          <q-item
            clickable
            :to="link.link"
          >
            <q-item-section
              v-if="link.icon"
              avatar
            >
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label v-if="link.caption" caption>{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const links = [
  {
    title: 'Recipes',
    // caption: 'quasar.dev',
    icon: 'mdi-bookmark-multiple',
    link: '/'
  }
]

const leftDrawerOpen = ref(false)
// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
