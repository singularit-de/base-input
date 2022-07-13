<template>
  <div class="wrapper">
    <input
      id="username"
      data-testid="base-input"
      type="text"
      :placeholder="placeholder"
      v-bind="inputAttributes"
    >
  </div>
</template>

<script setup lang="ts">

import type {InputHTMLAttributes, PropType} from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: undefined,
  },
  inputAttributes: {
    type: Object as PropType<InputHTMLAttributes>,
    default: undefined,
  },
})

</script>
