/// <reference types="cypress" />

describe('AddStudent Component', () => {
    beforeEach(() => {
        cy.visit('/') // Assuming the AddStudent component is at the root of the app
        cy.window().then((win) => {
            win.localStorage.setItem("students", JSON.stringify([])); // Setting initial students data in localStorage
        });
    });

    it('should render AddStudent form correctly', () => {
        cy.get('form').should('exist')
        cy.contains('Add Student').should('exist')
    });

    it('should capture user input correctly', () => {
        cy.get('input[name="name"]').type('John Doe')
        cy.get('input[name="class"]').type('10B')
        
        cy.get('input[name="name"]').should('have.value', 'John Doe')
        cy.get('input[name="class"]').should('have.value', '10B')
    });

    it('should add student to localStorage and navigate to dashboard on form submission', () => {
        const studentName = 'John Doe';
        const className = '10B';
        
        cy.get('input[name="name"]').type(studentName)
        cy.get('input[name="class"]').type(className)
        
        cy.get('button[type="submit"]').click()
        
        cy.window().then((win) => {
            const students = JSON.parse(win.localStorage.getItem('students'));
            expect(students).to.have.length(1);
            expect(students[0]).to.deep.include({
                StudentName: studentName,
                ClassName: className,
            });
        });

        cy.url().should('include', '/dashboard')
    });

    it('should close the form on cancel', () => {
        cy.contains('Cancel').click()
        cy.get('form').should('not.exist') // Ensuring form is no longer visible
    });

    // Nested conditions and dropdowns can be tested using conditional assertions as below:
    it('should perform different actions based on conditions', () => {
        // Let's say we have a condition where different classes have specific form modifications or restrictions
        cy.get('input[name="name"]').type('John Doe')
        
        // Assuming there's a dropdown for class selection in place of a text input
        cy.get('select[name="class"]').select('10B')
        
        // Perform assertions based on class selection
        cy.get('select[name="class"]').should('have.value', '10B')

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')
        
        // Check if the appropriate class-specific behavior occurred
        cy.window().then((win) => {
            const students = JSON.parse(win.localStorage.getItem('students'));
            expect(students[0].ClassName).to.equal('10B');
            // Add any other class specific checks
        });
    });

    // Additional edge cases
    it('should handle empty inputs gracefully', () => {
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/dashboard')
        cy.contains('Add Student').should('exist') // Ensuring the form still exists
    });

    it('should handle duplicate student entries', () => {
        cy.get('input[name="name"]').type('John Doe')
        cy.get('input[name="class"]').type('10B')
        cy.get('button[type="submit"]').click()

        cy.get('form').should('not.exist') // Form should disappear after submission

        // Open the form again to add duplicate student
        cy.get('button').contains('Add New Student').click()
        cy.get('input[name="name"]').type('John Doe')
        cy.get('input[name="class"]').type('10B')
        cy.get('button[type="submit"]').click()
        
        cy.window().then((win) => {
            const students = JSON.parse(win.localStorage.getItem('students'));
            expect(students).to.have.length(2); // Ensuring duplicate entries are allowed
        });
    });
});