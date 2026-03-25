import { defineConfig } from "cypress";
import dotenv from "dotenv";
import vitePreprocessor from "cypress-vite";

dotenv.config();

export default defineConfig({
  allowCypressEnv: false,
  env: {
    baseURL: process.env.BASE_URL,
    userData: {
      userName: process.env.USERNAME_1,
      password: process.env.PASSWORD_1,
      firstName: process.env.USER_FULLNAME_1.split(' ')[0],
      lastName: process.env.USER_FULLNAME_1.split(' ')[1],
    },
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: "cypress/tests/**/*.cy.js",
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor({
        configFile: "vite.config.js"
      }));
      return config;
    },
  },
});

