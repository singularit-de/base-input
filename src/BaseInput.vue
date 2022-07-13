<template>
  <div
    :class="theme.wrapper"
  >
    <input
      id="username"
      data-testid="base-input"
      class="appearance-none focus:outline-none w-full"
      :class="theme.input"
      type="text"
      :placeholder="placeholder"
      v-bind="inputAttributes"
    >
  </div>
</template>

<script setup lang="ts">

import type {InputHTMLAttributes, PropType} from 'vue'
import type {InputClasses} from './interface'
import useMergedClassesRef from './utils/useMergedClasses'

const props = defineProps({
  placeholder: {
    type: String,
    default: undefined,
  },
  inputAttributes: {
    type: Object as PropType<InputHTMLAttributes>,
    default: undefined,
  },
  classes: {
    type: Object as PropType<InputClasses>,
    default: () => ({}),
  },
})

const theme = useMergedClassesRef(props.classes)

</script>
