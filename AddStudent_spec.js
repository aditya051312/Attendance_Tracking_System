/// <reference types="cypress" />

describe('AddStudent Component Tests', () => {
    beforeEach(() => {
        // Setting up a localStorage mock item before each test
        const initialStudentData = JSON.stringify([
            { StudentID: '01', StudentName: 'John Doe', ClassName: 'Physics' }
        ]);
        window.localStorage.setItem('students', initialStudentData);

        // Visit the page where the AddStudent component is rendered
        cy.visit('/path-to-your-component-page');
    });

    it('should display the AddStudent modal when setModal is true', () => {
        cy.get('.backdrop-blur-[2px]').should('be.visible');
    });

    it('should close the modal when `Cancel` is clicked', () => {
        cy.get('.text-[#7B7B7B]').contains('Cancel').click();
        cy.get('.backdrop-blur-[2px]').should('not.exist');
    });

    it('should submit form and save data into localStorage', () => {
        cy.get('input[name="name"]').type('Jane Smith');
        cy.get('input[name="class"]').type('Mathematics');
        cy.get('button[type="submit"]').contains('Save').click();

        // Check that modal is closed
        cy.get('.backdrop-blur-[2px]').should('not.exist');

        // Validate localStorage data
        const students = JSON.parse(window.localStorage.getItem('students'));

        expect(students).to.have.length(2);
        expect(students[1]).to.deep.equal({
            StudentID: '02',
            StudentName: 'Jane Smith',
            ClassName: 'Mathematics'
        });

        // Validate navigation
        cy.url().should('include', '/dashboard');
    });

    it('should handle empty localStorage and add first student', () => {
        // Clear localStorage and reload the page
        window.localStorage.removeItem('students');
        cy.reload();

        cy.get('input[name="name"]').type('Jane Doe');
        cy.get('input[name="class"]').type('Biology');
        cy.get('button[type="submit"]').contains('Save').click();

        // Check that modal is closed
        cy.get('.backdrop-blur-[2px]').should('not.exist');

        // Validate localStorage data
        const students = JSON.parse(window.localStorage.getItem('students'));
        expect(students).to.have.length(1);
        expect(students[0]).to.deep.equal({
            StudentID: '01',
            StudentName: 'Jane Doe',
            ClassName: 'Biology'
        });

        // Validate navigation
        cy.url().should('include', '/dashboard');
    });

    it('should not add student if name or class is empty', () => {
        // Attempt to submit with empty name field
        cy.get('input[name="class"]').type('Mathematics');
        cy.get('button[type="submit"]').contains('Save').click();

        // Modal should still be visible
        cy.get('.backdrop-blur-[2px]').should('be.visible');

        // Attempt to submit with empty class field
        cy.get('input[name="name"]').type('Jane Smith');
        cy.get('input[name="class"]').clear();
        cy.get('button[type="submit"]').contains('Save').click();

        // Modal should still be visible
        cy.get('.backdrop-blur-[2px]').should('be.visible');

        // No changes should be made to localStorage
        const students = JSON.parse(window.localStorage.getItem('students'));
        expect(students).to.have.length(1);
    });

    it('should have correct initial form field values', () => {
        cy.get('input[name="name"]').should('have.value', '');
        cy.get('input[name="class"]').should('have.value', '');
    });
});