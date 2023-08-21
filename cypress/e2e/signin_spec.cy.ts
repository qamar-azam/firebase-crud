describe('/signin', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/signin');
  });

  it('greets with Sign In', () => {
    cy.contains('h1', 'Sign In');
  });

  it('links to /signup', () => {
    cy.contains('Need an account?').should('have.attr', 'href', '/signup');
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

  it('navigation to / after sucessful login', () => {
    cy.get('[data-test=email]').type('qamar065@gmail.com');
    cy.get('[data-test=password]').type('qamar123');
    cy.contains('button', 'Submit').click();
    cy.url().should('equal', 'http://127.0.0.1:5173/');
  });
});
