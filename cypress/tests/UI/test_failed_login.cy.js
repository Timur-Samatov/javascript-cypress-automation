import { HomePage } from "../../pages/homePage";
import { AccoutOverviewPage } from "../../pages/accoutOverviewPage";

describe('Test that login fails with invalid credentials and displays appropriate error messages.', () => {
    it('', () => {
        // Open the ParaBank homepage
        cy.visit('');
        //Login using invalid credentials
        HomePage.login('invalid-user', 'invalid-password');

        // Validate: An error message is displayed
        HomePage.errorMessage().should('be.visible');
        HomePage.errorMessage().should('have.text', 'The username and password could not be verified.');

        // Validate: Accounts page is not accessible
        cy.url().should('not.include', AccoutOverviewPage.url);
        AccoutOverviewPage.accoutList().should('not.exist');
        cy.visit(AccoutOverviewPage.url, {
            failOnStatusCode: false
        });
        AccoutOverviewPage.accoutList().should('not.exist');
        AccoutOverviewPage.errorMessage().should('be.visible');
        AccoutOverviewPage.errorMessage().should('have.text', 'An internal error has occurred and has been logged.');
    });
});