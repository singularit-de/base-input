import type {ComputedRef} from 'vue'
import {computed} from 'vue'
import type {InputClasses} from '../interface'
import defaultTheme from './defaultTheme'

export default function useMergedClassesRef(classes: Partial<InputClasses>): ComputedRef<InputClasses> {
  return computed(() => {
    return {
      ...defaultTheme,
      ...classes,
    }
  })
}
