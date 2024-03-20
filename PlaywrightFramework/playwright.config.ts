import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    baseURL: "http://localhost:4200/",
  },
};

export default config;
