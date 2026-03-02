import { BasePage } from "./basePage";

export const AccoutOverviewPage = {
    ...BasePage,
    url: '/parabank/overview.htm',

    accoutList() {
        return cy.get('#accountTable')
    },
}