import type { Page } from "@playwright/test";

export class ExampleClass {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getBreedText() {
    return this.page.innerText(
      "[data-test=dogsTable] tr:first-child td:nth-child(2)"
    );
  }
}
