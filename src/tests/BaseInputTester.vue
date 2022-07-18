<template>
  <BaseInput
    ref="inputRef"
    v-model="value"
    :type="textarea ? 'textarea' : 'text'"
  />
  <button
    data-testid="focus-btn"
    @click="focusInput"
  >
    Focus
  </button>
  <button
    data-testid="blur-btn"
    @click="blurInput"
  >
    Blur after 0.5 sec
  </button>
  <button
    data-testid="select-btn"
    @click="selectInput"
  >
    Select
  </button>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import BaseInput from '../BaseInput.vue'

const value = ref('Hello World')

defineProps({
  textarea: {
    type: Boolean,
    default: false,
  },
})

const inputRef = ref()

const focusInput = () => {
  if (inputRef.value)
    inputRef.value.focus()
}

const blurInput = () => {
  if (inputRef.value) {
    setTimeout(() => {
      inputRef.value.blur()
    }, 500)
  }
}

const selectInput = () => {
  if (inputRef.value)
    inputRef.value.select()
}

</script>
