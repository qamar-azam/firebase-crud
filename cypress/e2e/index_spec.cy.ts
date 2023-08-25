import { formatDate } from '../../src/utils/util';
const todos = require('../fixtures/todo');

describe('Todo Form', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('contain form fields', () => {
    cy.get('input[name=title]').should('have.attr', 'placeholder', 'Title');
    cy.get('input[name=description]').should(
      'have.attr',
      'placeholder',
      'Description'
    );
    cy.get('input[type=checkbox]').should('exist');
    cy.contains('button', 'Add new todo').should('exist');
  });

  it('should add new todo', () => {
    const { title, description, complete } = todos[0];
    const date = new Date();
    cy.get('input[name=title]').type(title);
    cy.get('input[name=description]').type(description);
    cy.get('input[type=checkbox]').click();

    cy.contains('button', 'Add new todo').click();

    cy.get('[data-test=todo-card]').eq(0).should('contain.text', title);
    cy.get('[data-test=todo-card]').eq(0).should('contain.text', description);
    cy.get('[data-test=todo-card]')
      .eq(0)
      .should('contain.text', complete ? 'Completed' : 'Pending');

    cy.get('[data-test=todo-card]')
      .eq(0)
      .should('contain.text', formatDate(date.toString()));
  });

  it('should edit todo', () => {
    cy.get('[data-test=todo-card]')
      .eq(0)
      .trigger('mouseover')
      .find('[aria-label=edit]')
      .click({ force: true });

    cy.get('input[name=title]').clear().type('updated Title');
    cy.contains('button', 'Update todo').click();

    cy.contains('button', 'Add new todo');
    cy.get('[data-test=todo-card]').eq(0).contains('updated Title');
  });

  it('should delete todo', () => {
    cy.get('[data-test=todo-card]').then((items) => {
      cy.wrap(items[0])
        .trigger('mouseover')
        .find('[aria-label=delete]')
        .click({ force: true });

      cy.get('[data-test=todo-card]').should('have.length', items.length - 1);
    });
  });
});
