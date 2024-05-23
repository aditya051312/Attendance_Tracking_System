/// <reference types="cypress" />

describe('AddStudent Component', () => {

beforeEach(() => {
// Navigate to the page where the `AddStudent` component is rendered
cy.visit('/your-component-path'); // Update this path based on your routing
});

it('should display the AddStudent form correctly', () => {
// Verify that the form headings and input fields are displayed
cy.contains('Add Student').should('be.visible');
cy.contains('Name of Student').should('be.visible');
cy.contains('Class Name').should('be.visible');

cy.get('input[name="name"]').should('have.attr', 'placeholder', 'Enter Name');
cy.get('input[name="class"]').should('have.attr', 'placeholder', 'Enter Class Name');
});

it('should allow input in the form fields', () => {
// Type in the student name and class name
cy.get('input[name="name"]').type('John Doe').should('have.value', 'John Doe');
cy.get('input[name="class"]').type('10th Grade').should('have.value', '10th Grade');
});

it('should add a student to local storage on form submission', () => {
// Fill in the form fields
cy.get('input[name="name"]').type('Jane Smith');
cy.get('input[name="class"]').type('6th Grade');

// Submit the form
cy.get('button[type="submit"]').click();

// Verify that the student data is added to local storage
cy.window().then((win) => {
const studentsData = JSON.parse(win.localStorage.getItem('students'));
expect(studentsData).to.be.an('array');
expect(studentsData).to.deep.include({ StudentID: '01', StudentName: 'Jane Smith', ClassName: '6th Grade' });
});
});

it('should navigate to the dashboard and close the modal on form submission', () => {
// Fill in the form fields
cy.get('input[name="name"]').type('Sam Wilson');
cy.get('input[name="class"]').type('7th Grade');

// Submit the form
cy.get('button[type="submit"]').click();

// Verify that it navigates to the dashboard and modal is closed
cy.url().should('include', '/dashboard');
cy.get('.modal-selector').should('not.exist'); // Replace `.modal-selector` with actual modal class/ID if applicable.
});

it('should cancel the form without adding data to local storage', () => {
// Fill in the form fields
cy.get('input[name="name"]').type('Will Not Add');
cy.get('input[name="class"]').type('Not Added Class');

// Click the cancel button
cy.contains('Cancel').click();

// Verify that no new student is added to local storage
cy.window().then((win) => {
const studentsData = JSON.parse(win.localStorage.getItem('students'));
if (studentsData) {
expect(studentsData).to.not.deep.include({ StudentID: '01', StudentName: 'Will Not Add', ClassName: 'Not Added Class' });
}
});

// Verify that it closes the modal
cy.get('.modal-selector').should('not.exist'); // Replace `.modal-selector` with actual modal class/ID if applicable.
});

it('should validate input fields', () => {
// Try submitting the form without filling fields
cy.get('button[type="submit"]').click();

// Verify that validation messages are displayed, you need to implement frontend validation for this test to work.
// For demonstration purposes, we'll assume there are validation spans with respective ids
cy.contains('Please enter the student name').should('be.visible'); // Placeholder message
cy.contains('Please enter the class name').should('be.visible'); // Placeholder message
});
});