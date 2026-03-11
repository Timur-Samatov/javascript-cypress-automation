import { HomePage } from "../../pages/homePage";
import { AccoutOverviewPage } from "../../pages/accoutOverviewPage";
import { ParabankApiClient } from "../../support/parabankApiclient";

describe("Test successful login to the Parabank application.", () => {
  let freshRegisteredUser;
  before(() => {
    freshRegisteredUser = ParabankApiClient.registerNewUser({
      stayLoggedIn: false,
    });
  });
  it("Verify that the user can successfully log in to the application.", () => {
    // Open the ParaBank homepage
    cy.visit("");
    //Login using valid credentials
    HomePage.login(freshRegisteredUser.username, freshRegisteredUser.password);

    // Validate: The welcome message with customer name
    HomePage.welcomeMessage().should("be.visible");
    HomePage.welcomeMessage().should(
      "have.text",
      "Welcome " + freshRegisteredUser.fullName,
    );

    // Validate: Account list is displayed
    AccoutOverviewPage.accoutList().should("be.visible");
  });
});
