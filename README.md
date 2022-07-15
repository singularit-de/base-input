# @singularit/base-input

## Usage

```bash
npm i @singularit/base-input
```

```vue
<template>
  <SBaseInput
    v-model="name"
    placeholer="Enter your name"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {SBaseInput} from '@singularit/base-input'

const name = ref('')
</script>
```

## Props

| Prop            | Type          | Default      | Description                                             |
|-----------------|---------------|--------------|---------------------------------------------------------|
| placeholder     | `string`      | `undefined`  |                                                         |
| modelValue      | `string`      | `undefined`  |                                                         |
| textarea        | `boolean`     | `undefined`  |                                                         |
| inputAttributes | `object`      | `undefined`  | you can pass any HTML attributes to the input/textarea  |
| classes         | `string`      | `{}`         | used to override styling of input and children elements |

## Styling

The input is styled with a  [default theme](src/utils/defaultTheme.ts). If you want to override some parts of the theme
you can use the `classes` prop to pass any calles (e.g. tailwind classes).

```vue
<SBaseInput :classes="{wrapper: 'rounded-full'}"></SBaseInput>
```

`SBaseInput` is designed to be wrapped in a component inside you project. Due to its flexibility it is very adaptable.
You can also create simple number inputs, text inputs, textareas, etc. (use the `inputAttributes` prop to pass any HTML attributes).

## Examples
coming soon