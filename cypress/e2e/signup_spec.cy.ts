describe('/signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('greets with Sign In', () => {
    cy.contains('h1', 'Sign Up');
  });

  it('links to /signup', () => {
    cy.contains('Have an account ?').should('have.attr', 'href', '/signin');
  });

  it('have email and password fields', () => {
    cy.get('[data-test=email]').should(
      'have.attr',
      'placeholder',
      'Email Address'
    );
    cy.get('[data-test=password]').should(
      'have.attr',
      'placeholder',
      'Password'
    );

    cy.contains('button', 'Submit');
  });

  it('requires email address', () => {
    cy.get('[data-test=password]').type('1234');
    cy.get('button').click();

    cy.get('.error-msg').should('contain', "Email address can't be blank");
  });

  it('requires password', () => {
    cy.get('[data-test=email]').type('fake@email.com');
    cy.contains('button', 'Submit').click();

    cy.get('.error-msg').should('contain', "Password can't be blank");
  });

  it('navigation to /signin page after sucessful singup', () => {
    cy.get('[data-test=email]').type('fake@gmail.com');
    cy.get('[data-test=password]').type('1234456789');
    cy.contains('button', 'Submit').click();
    cy.location('pathname').should('equal', '/signin');
  });
});
