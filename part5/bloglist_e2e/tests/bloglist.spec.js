import "dotenv/config";
import test, { expect, beforeEach, describe } from "@playwright/test";

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testing User',
        username: process.env.TESTS_USERNAME,
        password: process.env.TESTS_PASSWORD
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_PASSWORD)
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Testing User successfully logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill('wrongString')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
})