import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  allowCypressEnv: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    USERNAME_1: process.env.USERNAME_1,
    PASSWORD_1: process.env.PASSWORD_1,
    USER_FULLNAME_1: process.env.USER_FULLNAME_1,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: "cypress/tests/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

