export const LoginForm = {
    userNameInput() {
        return cy.get('[name="username"]')
    },
    passwordInput() {
        return cy.get('[name="password"]')
    },
    loginButton() {
        return cy.get('input[value="Log In"]')
    },

    login(userName, password) {
        this.userNameInput().type(userName);
        this.passwordInput().type(password);
        this.loginButton().click();
    },
}