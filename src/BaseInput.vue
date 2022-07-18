<template>
  <div
    :class="theme.wrapper"
    data-testid="base-input-wrapper"
    @click="handleWrapperClick"
  >
    <div
      v-if="$slots.prefix"
      data-testid="base-input-prefix"
      :class="theme.prefix"
    >
      <slot name="prefix" />
    </div>

    <input
      v-if="!textarea"
      ref="inputRef"
      v-model="value"
      data-testid="base-input-input"
      :class="theme.input"
      :placeholder="placeholder"
      v-bind="inputAttributes"
    >
    <textarea
      v-else
      ref="inputRef"
      v-model="value"
      :placeholder="placeholder"
      :class="theme.input"
      data-testid="base-input-textarea"
    />
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

import type {InputHTMLAttributes, PropType, TextareaHTMLAttributes} from 'vue'
import {computed, ref} from 'vue'
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
  textareaAttributes: {
    type: Object as PropType<TextareaHTMLAttributes>,
    default: undefined,
  },
  classes: {
    type: Object as PropType<Partial<InputClasses>>,
    default: () => ({}),
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
})

const theme = useMergedClassesRef(props.classes)

const inputRef = ref<HTMLInputElement | null>(null)

const model = ref('')

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>()

const isUncontrolled = computed(() => props.modelValue === undefined)

const value = computed<string>({
  get() {
    if (!isUncontrolled.value)
      return props.modelValue as string
    else
      return model.value
  },
  set(value) {
    if (!isUncontrolled.value)
      emit('update:modelValue', value)
    else
      model.value = value
  },
})

const focusInput = () => {
  if (inputRef.value)
    inputRef.value.focus()
}

const blurInput = () => {
  if (inputRef.value)
    inputRef.value.blur()
}

const selectInput = () => {
  if (inputRef.value)
    inputRef.value.select()
}

const handleWrapperClick = () => {
  focusInput()
}

defineExpose({
  focus: focusInput,
  blur: blurInput,
  select: selectInput,
})

</script>
