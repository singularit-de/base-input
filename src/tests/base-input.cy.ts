import {mount} from 'cypress/vue'
import BaseInput from '../BaseInput.vue'
import BaseInputTester from './BaseInputTester.vue'

const inputSelector = '[data-testid=base-input-input]'
const textareaSelector = '[data-testid=base-input-textarea]'
const wrapperSelector = '[data-testid=base-input-wrapper]'
const prefixSelector = '[data-testid=base-input-prefix]'
const suffixSelector = '[data-testid=base-input-suffix]'
const focusBtnSelector = '[data-testid=focus-btn]'
const blurBtnSelector = '[data-testid=blur-btn]'
const selectBtnSelector = '[data-testid=select-btn]'

const defaultPlaceholderText = 'Placeholder'
const defaultPrefixText = 'Prefix'
const defaultSuffixText = 'Suffix'
const defaultValueText = 'Hello World!'

const randomTailwindClasses = ['text-red-500', 'bg-gray-100', 'border-gray-200', 'h-32']

describe('<BaseInput />', () => {
  it('should mount', () => {
    mount(BaseInput)

    cy.get(inputSelector).should('exist')
  })

  it('is visible, textarea not', () => {
    mount(BaseInput)

    cy.get(inputSelector).should('be.visible')
    cy.get(textareaSelector).should('not.exist')
  })

  it('should show placeholder', () => {
    mount(BaseInput, {props: {placeholder: defaultPlaceholderText}})

    cy.get(inputSelector).should('have.attr', 'placeholder', defaultPlaceholderText)
  })

  it('should apply styles passed to prop classes.input', () => {
    mount(BaseInput, {props: {classes: {input: randomTailwindClasses}}})

    randomTailwindClasses.forEach((className) => {
      cy.get(inputSelector).should('have.class', className)
    })
  })

  it('should apply styles passed to prop classes.wrapper', () => {
    mount(BaseInput, {props: {classes: {wrapper: randomTailwindClasses}}})

    randomTailwindClasses.forEach((className) => {
      cy.get(wrapperSelector).should('have.class', className)
    })
  })

  it('should apply styles passed to prop classes.prefix', () => {
    mount(BaseInput, {props: {classes: {prefix: randomTailwindClasses}}, slots: {prefix: () => defaultPrefixText}})

    randomTailwindClasses.forEach((className) => {
      cy.get(prefixSelector).should('have.class', className)
    })
  })

  it('should apply styles passed to prop classes.suffix', () => {
    mount(BaseInput, {props: {classes: {suffix: randomTailwindClasses}}, slots: {suffix: () => defaultSuffixText}})

    randomTailwindClasses.forEach((className) => {
      cy.get(suffixSelector).should('have.class', className)
    })
  })

  it('should not have prefix and suffix by default', () => {
    mount(BaseInput)

    cy.get(prefixSelector).should('not.exist')
    cy.get(suffixSelector).should('not.exist')
  })

  it('renders prefix if passed via slot', () => {
    mount(BaseInput, {slots: {prefix: () => defaultPrefixText}})

    cy.get(prefixSelector).should('exist').and('be.visible').and('have.text', defaultPrefixText)
  })

  it('renders suffix if passed via slot', () => {
    mount(BaseInput, {slots: {suffix: () => defaultSuffixText}})

    cy.get(suffixSelector).should('exist').and('be.visible').and('have.text', defaultSuffixText)
  })

  it('should work uncontrolled if modelValue is undefined', () => {
    const onUpdateModelValueSpy = cy.spy().as('update:modelValue')

    mount(BaseInput, {props: {'onUpdate:modelValue': onUpdateModelValueSpy}})

    cy.get(inputSelector).type(defaultValueText)
    // should not emit 'update:modelValue'
    cy.get('@update:modelValue').should('not.have.been.called')
    // should have typed text
    cy.get(inputSelector).should('have.value', defaultValueText)
  })

  it('should work controlled with modelValue', () => {
    const onUpdateModelValueSpy = cy.spy().as('update:modelValue')

    mount(BaseInput, {props: {'modelValue': defaultValueText, 'onUpdate:modelValue': onUpdateModelValueSpy}})

    cy.get(inputSelector).type(defaultValueText)
    // should emit 'update:modelValue'
    cy.get('@update:modelValue').should('have.been.called', 'with', defaultValueText + defaultValueText)
    // should have typed text
    cy.get(inputSelector).should('have.value', defaultValueText + defaultValueText)
  })

  it('should focus the input via exposed function: focus', () => {
    mount(BaseInputTester)

    cy.get(focusBtnSelector).should('be.visible').click()
    cy.get(inputSelector).should('have.focus')
  })

  it('should blur the input via exposed function: blur', () => {
    mount(BaseInputTester)

    cy.get(blurBtnSelector).should('be.visible').click()
    cy.get(focusBtnSelector).should('be.visible').click()
    cy.get(inputSelector).should('have.focus')
    cy.wait(1000)
    cy.get(inputSelector).should('not.have.focus')
  })

  it('should select the input content via exposed function: select', () => {
    mount(BaseInputTester)
    const newText = 'New Text'

    cy.get(selectBtnSelector).should('be.visible').click()
    cy.get(inputSelector).type(newText)
    cy.get(inputSelector).should('have.value', newText)
  })

  it('textarea is visible, input not', () => {
    mount(BaseInput, {props: {textarea: true}})

    cy.get(textareaSelector).should('exist').and('be.visible')
    cy.get(inputSelector).should('not.exist')
  })

  it('textarea should show placeholder', () => {
    mount(BaseInput, {props: {textarea: true, placeholder: defaultPlaceholderText}})

    cy.get(textareaSelector).should('have.attr', 'placeholder', defaultPlaceholderText)
  })

  it('textarea should apply styles passed to prop classes.input', () => {
    mount(BaseInput, {props: {textarea: true, classes: {input: randomTailwindClasses}}})

    randomTailwindClasses.forEach((className) => {
      cy.get(textareaSelector).should('have.class', className)
    })
  })

  it('textarea renders prefix if passed via slot', () => {
    mount(BaseInput, {slots: {prefix: () => defaultPrefixText}, props: {textarea: true}})

    cy.get(prefixSelector).should('exist').and('be.visible').and('have.text', defaultPrefixText)
  })

  it('textarea renders suffix if passed via slot', () => {
    mount(BaseInput, {slots: {suffix: () => defaultSuffixText}, props: {textarea: true}})

    cy.get(suffixSelector).should('exist').and('be.visible').and('have.text', defaultSuffixText)
  })

  it('textarea should work uncontrolled if modelValue is undefined', () => {
    const onUpdateModelValueSpy = cy.spy().as('update:modelValue')

    mount(BaseInput, {props: {'onUpdate:modelValue': onUpdateModelValueSpy, 'textarea': true}})

    cy.get(textareaSelector).type(defaultValueText)
    // should not emit 'update:modelValue'
    cy.get('@update:modelValue').should('not.have.been.called')
    // should have typed text
    cy.get(textareaSelector).should('have.value', defaultValueText)
  })

  it('textarea should work controlled with modelValue', () => {
    const onUpdateModelValueSpy = cy.spy().as('update:modelValue')

    mount(BaseInput, {props: {'modelValue': defaultValueText, 'onUpdate:modelValue': onUpdateModelValueSpy, 'textarea': true}})

    cy.get(textareaSelector).type(defaultValueText)
    // should emit 'update:modelValue'
    cy.get('@update:modelValue').should('have.been.called', 'with', defaultValueText + defaultValueText)
    // should have typed text
    cy.get(textareaSelector).should('have.value', defaultValueText + defaultValueText)
  })

  it('textarea should focus the input via exposed function: focus', () => {
    mount(BaseInputTester, {props: {textarea: true}})

    cy.get(focusBtnSelector).should('be.visible').click()
    cy.get(textareaSelector).should('have.focus')
  })

  it('textarea should blur the input via exposed function: blur', () => {
    mount(BaseInputTester, {props: {textarea: true}})

    cy.get(blurBtnSelector).should('be.visible').click()
    cy.get(focusBtnSelector).should('be.visible').click()
    cy.get(textareaSelector).should('have.focus')
    cy.wait(1000)
    cy.get(textareaSelector).should('not.have.focus')
  })

  it('textarea should select the input content via exposed function: select', () => {
    mount(BaseInputTester, {props: {textarea: true}})
    const newText = 'New Text'

    cy.get(selectBtnSelector).should('be.visible').click()
    cy.get(textareaSelector).type(newText)
    cy.get(textareaSelector).should('have.value', newText)
  })
})

