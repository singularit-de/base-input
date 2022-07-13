<template>
  <div
    :class="theme.wrapper"
    data-testid="base-input-wrapper"
  >
    <div
      v-if="$slots.prefix"
      data-testid="base-input-prefix"
      :class="theme.prefix"
    >
      <slot name="prefix" />
    </div>

    <input
      id="username"
      data-testid="base-input-input"
      class="appearance-none focus:outline-none w-full"
      :class="theme.input"
      type="text"
      :placeholder="placeholder"
      v-bind="inputAttributes"
    >
    <div
      v-if="$slots.suffix"
      data-testid="base-input-suffix"
      :class="theme.suffix"
    >
      <slot name="suffix" />
    </div>
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
    type: Object as PropType<Partial<InputClasses>>,
    default: () => ({}),
  },
})

const theme = useMergedClassesRef(props.classes)

</script>
