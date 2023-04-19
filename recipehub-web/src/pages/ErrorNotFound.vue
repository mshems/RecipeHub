<template>
  <div class="fullscreen bg-accent text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h1 q-mb-lg">
        <q-icon name="mdi-chef-hat"/>
      </div>
      <div class="text-h2" style="opacity:.4">
        Error 404
      </div>

      <q-btn
        size="xl"
        class="q-mt-xl"
        color="white"
        text-color="accent"
        unelevated
        to="/"
        rounded
        icon="mdi-pot-steam"
        label="Get Cooking"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
