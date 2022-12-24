<template>
  <q-layout view="lHh Lpr fFf">
    <!-- <q-header>
      <q-toolbar class="text-primary bg-body">
        <q-toolbar-title>
          <q-btn flat label="RecipeHub" @click="() => router.push('/')" />
        </q-toolbar-title>
        <q-space />
        <q-btn round flat color="primary" icon="mdi-dots-vertical-circle-outline"/>
      </q-toolbar>
    </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>
