export interface InputClasses {
  wrapper: string | string[]
  input: string | string[]
  prefix: string | string[]
  suffix: string | string[]
}

type HTMLInputTypeAttribute =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | string

export type InputType = Exclude<HTMLInputTypeAttribute, 'radio' | 'button' | 'checkbox' | 'image' | 'reset' | 'submit'> | 'textarea'
