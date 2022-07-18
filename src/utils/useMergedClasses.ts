import type {ComputedRef} from 'vue'
import {computed} from 'vue'
import type {InputClass} from '../interface'
import defaultTheme from './defaultTheme'

export default function useMergedClassesRef(classes: Partial<InputClass>): ComputedRef<InputClass> {
  return computed(() => {
    return {
      ...defaultTheme,
      ...classes,
    }
  })
}
