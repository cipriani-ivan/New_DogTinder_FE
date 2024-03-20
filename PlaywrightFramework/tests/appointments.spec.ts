import { test, expect } from "@playwright/test";
import { ExampleClass } from "../pages/dogs.page";

test("Navigate to appointments", async ({ page }) => {
  await page.goto("/appointments");
  const url = page.url();
  expect(url).toContain("login");
});

