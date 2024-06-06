// cypress/integration/login_spec.js
describe('Login Page Tests', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/');
  });

  it('should display the login logo and title', () => {
    // Check if the logo is displayed
    cy.get('img[alt="ATS Logo"]').should('be.visible');

    // Check if the title is displayed
    cy.contains('ATS').should('be.visible');
    cy.contains('Login to Attendance Tracker System (ATS)').should('be.visible');
  });

  it('should allow users to input email and password', () => {
    // Input email
    cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com');

    // Input password
    cy.get('input[type="password"]').type('password123').should('have.value', 'password123');
  });

  it('should display and allow interaction with the "Keep me signed in" checkbox', () => {
    // Check if the checkbox exists and can be interacted with
    cy.get('input[type="checkbox"][name="remember"]').check().should('be.checked');
    cy.get('input[type="checkbox"][name="remember"]').uncheck().should('not.be.checked');
  });

  it('should navigate to forgot password page on clicking "Forgot password?" link', () => {
    // Click on the "Forgot password?" link
    cy.contains('Forgot password?').click();

    // Verify the navigation
    cy.url().should('include', '/forgot');
  });

  it('should validate local storage setup and successfully login', () => {
    // Set up local storage manually for the test
    const initialData = [
      { StudentID: '001', StudentName: 'Alex Smith', ClassName: '10th' },
      // ... other students
    ];
    const attendanceSheet = {
      [new Date().toISOString().slice(0, 10)]: initialData.map(item => ({
        StudentID: item.StudentID,
        StudentName: item.StudentName,
        ClassName: item.ClassName,
        Attendance: False,
      })),
    };

    cy.window().then((win) => {
      win.localStorage.setItem('students', JSON.stringify(initialData));
      win.localStorage.setItem('attendance', JSON.stringify(attendanceSheet));
    });

    // Input email and password
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');

    // Click on the login button
    cy.get('button').contains('Login').click();

    // Verify navigation to the dashboard
    cy.url().should('include', '/dashboard');
  });

  it('should display reCAPTCHA message', () => {
    // Check if the reCAPTCHA message is displayed
    cy.contains("This page is protected by Google reCAPTCHA to ensure you're not a bot.").should('be.visible');
    cy.contains('Learn more').should('be.visible').and('have.attr', 'href', '/learn-more');
  });

  // Nested conditions based on email and password
  describe('Nested Conditions based on Inputs', () => {
    const testCases = [
      { email: 'invalid', password: 'short', errorMessage: 'Invalid email format' },
      { email: 'valid@example.com', password: 'short', errorMessage: 'Password too short' },
      { email: 'test@example.com', password: 'correctpassword', errorMessage: '' },
    ];

    testCases.forEach((testCase) => {
      it(`should handle email: ${testCase.email}, password: ${testCase.password}`, () => {
        cy.get('input[type="email"]').clear().type(testCase.email);
        cy.get('input[type="password"]').clear().type(testCase.password);

        if (testCase.errorMessage) {
          cy.contains(testCase.errorMessage).should('be.visible');
        } else {
          cy.get('button').contains('Login').click();
          cy.url().should('include', '/dashboard');
        }
      });
    });
  });
});