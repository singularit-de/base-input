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
      v-model="value"
      :type="type"
      data-testid="base-input-input"
      :class="theme.input"
      v-bind="inputAttrs"
      @change="handleChange"
    >
    <textarea
      v-if="type === 'textarea'"
      ref="inputRef"
      v-model="value"
      :class="theme.input"
      data-testid="base-input-textarea"
      v-bind="textareaAttrs"
      @change="handleChange"
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
import type {InputClasses, InputType} from './interface'
import useMergedClassesRef from './utils/useMergedClasses'

const props = defineProps({
  inputAttributes: {
    type: Object as PropType<Omit<InputHTMLAttributes, 'type'> | TextareaHTMLAttributes>,
    default: undefined,
  },
  classes: {
    type: Object as PropType<Partial<InputClasses>>,
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

const model = ref('')

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'change', event: Event): void
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

const handleChange = (e: Event) => {
  emit('change', e)
}

defineExpose({
  focus: focusInput,
  blur: blurInput,
  select: selectInput,
})

</script>
