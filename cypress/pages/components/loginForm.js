export const LoginForm = {
  userNameInput: () => cy.get('[name="username"]'),

  passwordInput: () => cy.get('[name="password"]'),

  loginButton: () => cy.get('input[value="Log In"]'),

  login(userName, password) {
    this.userNameInput().type(userName);
    this.passwordInput().type(password);
    this.loginButton().click();
  },
};
