import { test, expect } from "@playwright/test";
import { ExampleClass } from "../pages/dogs.page";

test("dog page", async ({ page }) => {
  await page.goto("/dogs");
  let exampletest = new ExampleClass(page);
  var text = await exampletest.getBreedText();
  expect(text).toBe("GSP");
});
