<script setup>
import AppHeader from 'src/components/AppHeader.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { collection, addDoc } from 'firebase/firestore'

const router = useRouter()
const form = ref({
  body: '',
})

const editorRef = ref(null)
const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return
  let text, onPasteStripFormattingIEPaste
  evt.preventDefault()
  evt.stopPropagation()
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true
      editorRef.value.runCmd('ms-pasteTextOnly', text)
    }
    onPasteStripFormattingIEPaste = false
  }
}

const addRecipe = async () => {
  const now = new Date()
  const recipe = await addDoc(collection(db, 'recipes'), {
    title: form.value.title,
    image: form.value.image || '',
    link: form.value.link || '',
    body: form.value.body || '',
    notes: form.value.notes || '',
    created: now,
    last_updated: now
  })
  router.push(`/recipes/${recipe.id}`)
}
</script>

<template>
  <q-page padding>
    <app-header :title="'Create'"/>

    <q-card>
      <q-card-section>
        <q-form class='q-gutter-sm' @submit.prevent="addRecipe">
          <q-input
            clearable
            required
            outlined
            v-model="form.title"
            label='Recipe Title'
            input-class="text-bold"
          />
          <q-input
            clearable
            outlined
            v-model="form.link"
            label='Link'
          >
            <template v-slot:prepend>
              <q-icon name="mdi-link" />
            </template>
          </q-input>
          <q-input
            clearable
            outlined
            v-model="form.image"
            label='Image'
          >
            <template v-slot:prepend>
              <q-icon name="mdi-image" />
            </template>
          </q-input>
          <form
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
          >
            <q-editor
              ref="editorRef"
              outlined
              @paste="onPaste"
              v-model="form.body"
              label="Recipe"
              :toolbar="[
                ['left', 'center', 'right', 'justify'],
                ['bold', 'italic', 'strike', 'underline'],
                ['unordered', 'ordered'],
                ['hr', 'link'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: [
                      'p',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6',
                    ]
                  },
                  'removeFormat',
                ],
                ['undo', 'redo'],
              ]"
            />
          </form>
          <q-input
            outlined
            v-model="form.notes"
            label='Notes'
            type='textarea'
          />
          <div class="row q-gutter-sm">
            <q-space/>
            <q-btn
              flat
              type='reset'
              color='negative'
              label='Cancel'
              @click="router.push('/recipes')"
            />
            <q-btn
            type='submit'
            color='positive'
            label='Add Recipe'
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
