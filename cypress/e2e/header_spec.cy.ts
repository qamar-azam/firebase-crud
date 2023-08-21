describe('header', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('have logo', () => {
    cy.contains('Todo App').should('have.attr', 'href', '/');
  });

  it('show Sign Up button', () => {
    cy.contains('Sign Up').should('have.attr', 'href', '/signup');
  });

  it('show Sign Out button when logged in', () => {
    cy.login();
    cy.contains('button', 'Sign Out');
  });
});
