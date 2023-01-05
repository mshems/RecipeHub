<script setup>
import AppHeader from 'src/components/AppHeader.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from 'boot/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const loading = ref(false)

const form = ref({
  body: '',
})
const docRef = doc(db, 'recipes', props.id)
const getRecipe = async () => {
  loading.value = true
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    form.value = { body: '', ...docSnap.data() }
  } else {
    console.log('No such document!')
  }
  loading.value = false
}
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

const save = async () => {
  await setDoc(docRef, {
    title: form.value.title,
    image: form.value.image,
    link: form.value.link,
    body: form.value.body,
    notes: form.value.notes,
    last_updated: new Date(),
  }, { merge: true })
  router.push(`/recipes/${props.id}`)
}

onMounted(() => {
  getRecipe()
})
</script>

<template>
  <q-page padding>
    <app-header :title="'Update'"/>
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="save" class="q-gutter-sm">
          <q-input
            required
            clearable
            outlined
            v-model="form.title"
            label="Title"
            input-class="text-bold"
          />
          <q-input
            clearable
            outlined
            v-model="form.link"
            label="Link"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-link" />
            </template>
          </q-input>
          <q-input
            clearable
            outlined
            v-model="form.image"
            label="Image"
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
            clearable
            outlined
            type="textarea"
            v-model="form.notes"
            label="Notes"
          />
          <div class="row q-gutter-sm">
            <q-space/>
            <q-btn flat color="negative" @click="router.push(`/recipes/${id}`)">cancel</q-btn>
            <q-btn color="positive" type="submit">save</q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
