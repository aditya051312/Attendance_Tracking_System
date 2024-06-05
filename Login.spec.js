describe('Login Page Tests', () => {

  before(() => {
    // Visit the Login page before running the tests
    cy.visit('/login');
  });

  beforeEach(() => {
    // Clear local storage before each test
    window.localStorage.clear();
  });

  it('Should render the login page correctly', () => {
    // Verify if the logo is displayed
    cy.get('img[alt="ATS Logo"]').should('be.visible');

    // Check the main headings
    cy.contains('ATS').should('be.visible');
    cy.contains('Login to Attendance Tracker System (ATS)').should('be.visible');
  });

  context('Form Submission Tests', () => {

    it('Should show validation errors for empty fields', () => {
      // Click the login button without filling the form
      cy.contains('button', 'Login').click();

      // Check for validation messages
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('Should show validation error for invalid email', () => {
      // Enter invalid email
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('password123');
      
      // Click login
      cy.contains('button', 'Login').click();

      // Check for validation message
      cy.contains('Please enter a valid email address').should('be.visible');
    });

    it('Should show validation error for incorrect password', () => {
      // Enter valid email but incorrect password
      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('wrong-password');
      
      // Click login
      cy.contains('button', 'Login').click();

      // Check for validation message indicating incorrect password
      cy.contains('Incorrect password').should('be.visible');
    });
  });

  context('Remember Me Feature', () => {

    it('Should keep the user signed in when Remember Me is checked', () => {
      // Enter valid email and password
      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');

      // Check the remember me box
      cy.get('input[name="remember"]').check();

      // Click login
      cy.contains('button', 'Login').click();

      // Navigate to the dashboard
      cy.url().should('include', '/dashboard');

      // Verify that user is still logged in after refresh (Remember me functionality)
      cy.reload();
      cy.url().should('include', '/dashboard');
    });
  });

  context('Forgot Password Feature', () => {

    it('Should navigate to Forgot Password page', () => {
      // Click the forgot password link
      cy.contains('Forgot password?').click();

      // Verify navigation to forgot password page
      cy.url().should('include', '/forgot');
    });
  });

  context('Successful Login', () => {

    it('Should navigate to dashboard on successful login', () => {
      // Enter valid email and password
      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');

      // Click login
      cy.contains('button', 'Login').click();

      // Verify navigation to the dashboard
      cy.url().should('include', '/dashboard');
    });
  });
});