import { BasePage } from "./basePage";
import { LoginForm } from "./components/loginForm";

export const HomePage = {
  ...BasePage,
  ...LoginForm,
  welcomeMessage: () => cy.get("#leftPanel .smallText"),
};
