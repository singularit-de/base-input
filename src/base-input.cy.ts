import {mount} from 'cypress/vue'
import BaseInput from './BaseInput.vue'

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
})
