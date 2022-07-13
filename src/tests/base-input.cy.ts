import {mount} from 'cypress/vue'
import BaseInput from '../BaseInput.vue'

const inputSelector = '[data-testid=base-input]'
const defaultPlaceholderText = 'Placeholder'

describe('<BaseInput />', () => {
  it('should mount', () => {
    mount(BaseInput)

    cy.get(inputSelector).should('exist')
  })

  it('is visible', () => {
    mount(BaseInput)

    cy.get(inputSelector).should('be.visible')
  })

  it('should show placeholder', () => {
    mount(BaseInput, {props: {placeholder: defaultPlaceholderText}})

    cy.get(inputSelector).should('have.attr', 'placeholder', defaultPlaceholderText)
  })

  it('should apply styles passed to prop classes', () => {
    const randomTailwindClasses = ['text-red-500', 'bg-gray-100', 'border-gray-200', 'h-32']
    mount(BaseInput, {props: {classes: {input: randomTailwindClasses}}})

    randomTailwindClasses.forEach((className) => {
      cy.get(inputSelector).should('have.class', className)
    })
  })
})
