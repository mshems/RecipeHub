<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

const source = ref(props.data.link)
if (source.value) {
  source.value = new URL(props.data.link).hostname
  source.value = source.value.replace('www.', '')
}

</script>

<template>
  <q-card
    class="cursor-pointer q-pb-sm col-12"
    @click="router.push(`/recipes/${data.id}`)"
  >
    <q-img
      v-if="data.image"
      :src="data.image"
      :ratio="16/9"
      no-spinner
    />
    <q-img
      v-else
      :src="'placeholder'"
      :ratio="16/9"
      no-spinner
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-accent text-white">
          <q-icon name="mdi-pot-steam" size="5rem" />
        </div>
      </template>
    </q-img>
    <q-card-section class="card-title text-default q-pt-sm">
      <q-skeleton v-if="loading" type="text" />
      <div class="row" v-else>
        <div class="col row items-center">
            {{ data.title }}
        </div>
        <div class="row items-center col-shrink q-ml-md" style="max-height: 36px;">
          <q-icon class="" v-if="data.favorite" name="mdi-star" color="yellow-8" />
        </div>
      </div>
    </q-card-section>
    <q-card-section v-if="source" class="card-subtitle q-pt-sm">
      <div class="row items-center q-gutter-xs">
        <q-icon name="mdi-chef-hat"/>
        <span class="ellipsis">{{ source || 'custom' }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>
