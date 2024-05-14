describe('AddStudent', () => {
  beforeEach(() => {
    cy.visit('/add-student'); // assuming this is the route where the form is located
  });

  it('should have a form with name, email, and class fields', () => {
    cy.get('form').within(() => {
      cy.get('input[name="name"]');
      cy.get('input[name="email"]');
      cy.get('input[name="class"]');
    });
  });

  it('should allow users to enter a name, email, and class', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="class"]').type('Math');
  });

  it('should show an error message if the form is submitted with empty fields', () => {
    cy.get('form').submit();
    cy.get('.error-message').should('be.visible');
  });

  it('should submit the form when all fields are filled in', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="class"]').type('Math');
    cy.get('form').submit();
    // assuming the form redirects to a /students page after successful submission
    cy.url().should('include', '/students');
  });
});
