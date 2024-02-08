/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    // verify elements that should appear in login page
    cy.get('input[placeholder="Enter your email"]').should('be.visible');
    cy.get('input[placeholder="Enter your password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // login button clicked without filling email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // fill email
    cy.get('input[placeholder="Enter your email"]').type(
      'testemail@example.com'
    );

    // login button clicked without filling password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // fill wrong email
    cy.get('input[placeholder="Enter your email"]').type(
      'wrongemail@example.com'
    );

    // fill wrong password
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword');

    // login button clicked
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display message from API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    });
  });

  it('should redirect to homepage after successful login', () => {
    // Steps to perform login
    cy.get('input[placeholder="Enter your email"]').type(
      'razor.lightning@dota2.com'
    );
    cy.get('input[placeholder="Enter your password"]').type('123456');

    // Click the login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.visit('http://localhost:5173/');

    // Verify that the user is redirected to the homepage
    cy.url().should('eq', 'http://localhost:5173/');
  });
});
