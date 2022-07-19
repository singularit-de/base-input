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
      v-if="type !== 'textarea'"
      ref="inputRef"
      :value="value"
      :type="type"
      data-testid="base-input-input"
      :class="theme.input"
      v-bind="inputAttrs"
      @change="handleChange"
      @input="handleInput"
    >
    <textarea
      v-if="type === 'textarea'"
      ref="inputRef"
      :value="value"
      :class="theme.input"
      data-testid="base-input-textarea"
      v-bind="textareaAttrs"
      @change="handleChange"
      @input="handleInput"
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
import type {InputClass, InputEvent, InputType} from './interface'
import useMergedClassesRef from './utils/useMergedClasses'

const props = defineProps({
  inputAttributes: {
    type: Object as PropType<Omit<InputHTMLAttributes, 'type'> | TextareaHTMLAttributes>,
    default: undefined,
  },
  classes: {
    type: Object as PropType<Partial<InputClass>>,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  modelModifiers: {
    type: Object as PropType<Record<'lazy', boolean>>,
    default: () => ({}),
  },
})

// TODO: temporary workaround for https://github.com/vuejs/core/pull/6294
const inputAttrs = computed(() => {
  return props.inputAttributes as InputHTMLAttributes
})

const textareaAttrs = computed(() => {
  return props.inputAttributes as TextareaHTMLAttributes
})

const theme = useMergedClassesRef(props.classes)

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'change', value: typeof props.modelValue): void
  (e: 'input', value: typeof props.modelValue): void
}>()

const value = computed<string | number | undefined>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
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

const isLazy = computed(() => !!props.modelModifiers.lazy)

defineExpose({
  focus: focusInput,
  blur: blurInput,
  select: selectInput,
})

const handleChange = (e: Event) => {
  const event = e as InputEvent
  const target = event.target
  const targetValue = target.value
  let val: typeof props.modelValue = targetValue

  switch (props.type) {
    case 'number':
      if (targetValue === '')
        val = undefined
      else
        val = +val
      break
  }

  emit('change', val)
  if (isLazy.value)
    value.value = val
}

const handleInput = (e: Event) => {
  const event = e as InputEvent
  const target = event.target
  const targetValue = target.value
  let val: typeof props.modelValue = targetValue

  switch (props.type) {
    case 'number':
      if (targetValue === '')
        val = undefined
      else
        val = +val
      break
  }

  emit('input', val)
  if (!isLazy.value)
    value.value = val
}

</script>
