import { test, describe, expect, beforeEach } from "@playwright/test";
import "dotenv/config";

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto(process.env.TESTS_BASEURL)
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
    await page.getByTestId('txtPassword').fill(process.env.TESTS_USERPASS)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Testing User logged-in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_USERPASS)
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New note' }).click()
      await page.getByRole('textbox').fill('A new note created using Playwright')
      await page.getByRole('button', { name: 'Save' }).click()

      await expect(page.getByText('A new note created using Playwright')).toBeVisible()
    })
  })
})