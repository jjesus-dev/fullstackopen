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

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_PASSWORD)
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.getByTestId('txtTitle').fill('How to test frontend apps?')
      await page.getByTestId('txtAuthor').fill('John Doe')
      await page.getByTestId('txtUrl').fill('http://example.com/testingReact')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('Testing User added a new entry:')).toBeVisible()
    })

    test('a blog entry receives a like', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.getByTestId('txtTitle').fill('How to test frontend apps?')
      await page.getByTestId('txtAuthor').fill('John Doe')
      await page.getByTestId('txtUrl').fill('http://example.com/testingReact')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('Testing User added a new entry:')).toBeVisible()

      await page.getByRole('button', { name: 'View' }).click()

      const likeButton = await page.getByRole('button', { name: 'like' })
      const likeElement = await likeButton.locator('..')

      await likeButton.click()
      
      await expect(likeElement).toContainText('Likes: 1')
      await expect(page.getByText('Testing User liked an entry')).toBeVisible()
    })
  })
})