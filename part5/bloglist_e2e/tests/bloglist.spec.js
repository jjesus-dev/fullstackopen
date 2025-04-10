import "dotenv/config";
import test, { expect, beforeEach, describe } from "@playwright/test";

describe('Blog app', () => {
  const otherUsername = `${process.env.TESTS_USERNAME}New`
  const otherPassword = `${process.env.TESTS_PASSWORD}SOm3`

  const blogs = [
    {
      title: 'How to test frontend apps?',
      author: 'John Doe',
      url: 'http://example.com/testingReact'
    },
    {
      title: 'Another blog entry',
      author: 'Me',
      url: 'http://localhost:80'
    },
    {
      title: 'Blog with no likes',
      author: 'Jane Janet',
      url: 'http://aninternetsite/nobodylikesthis'
    },
  ]

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testing User',
        username: process.env.TESTS_USERNAME,
        password: process.env.TESTS_PASSWORD
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Testing User #2',
        username: otherUsername,
        password: otherPassword
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

      await page.getByTestId('txtTitle').fill(blogs[0].title)
      await page.getByTestId('txtAuthor').fill(blogs[0].author)
      await page.getByTestId('txtUrl').fill(blogs[0].url)
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('Testing User added a new entry:')).toBeVisible()
    })

    test('a blog entry receives a like', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.getByTestId('txtTitle').fill(blogs[1].title)
      await page.getByTestId('txtAuthor').fill(blogs[1].author)
      await page.getByTestId('txtUrl').fill(blogs[1].url)
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

  describe('When trying to delete a blog', () => {
    beforeEach(async ({ page, request }) => {
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_PASSWORD)
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Testing User successfully logged in')).toBeVisible()

      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByTestId('txtTitle').fill(blogs[2].title)
      await page.getByTestId('txtAuthor').fill(blogs[2].author)
      await page.getByTestId('txtUrl').fill(blogs[2].url)
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('Testing User added a new entry:')).toBeVisible()
      await page.getByRole('button', { name: 'Logout' }).click()
    })

    test('a blog is deleted by its owner', async ({ page }) => {
      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_PASSWORD)
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Testing User successfully logged in')).toBeVisible()

      await page.getByText('How to test frontend apps?')
      await page.getByRole('button', { name: 'View' }).click()
      
      page.on('dialog', async dialog => {
        await dialog.accept()
          .catch(error => console.log(error.message));
      });
      await page.getByRole('button', { name: 'Remove' }).click()
      
      await expect(page.getByText('Testing User has removed an entry')).toBeVisible()
    })

    test(`a blog can't be deleted by a different user`, async ({ page }) => {
      await page.getByTestId('txtUsername').fill(otherUsername)
      await page.getByTestId('txtPassword').fill(otherPassword)
      await page.getByRole('button', { name: 'Login' }).click()
      
      await expect(page.getByText('Testing User #2 successfully logged in')).toBeVisible()

      await page.getByText('How to test frontend apps?')
      await page.getByRole('button', { name: 'View' }).click()
      const removeButton = await page.getByRole('button', { name: 'Remove' })
      
      await expect(removeButton).not.toBeVisible()
    })
  })

  describe('After blogs are liked', () => {
    beforeEach(async ({ page }, testInfo) => {
      testInfo.setTimeout(testInfo.timeout + 6_000)

      await page.getByTestId('txtUsername').fill(process.env.TESTS_USERNAME)
      await page.getByTestId('txtPassword').fill(process.env.TESTS_PASSWORD)
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Testing User successfully logged in')).toBeVisible()

      for (let index = 0; index < blogs.length; index++) {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByTestId('txtTitle').fill(blogs[index].title)
        await page.getByTestId('txtAuthor').fill(blogs[index].author)
        await page.getByTestId('txtUrl').fill(blogs[index].url)
        await page.getByRole('button', { name: 'Create' }).click()

        await page.getByText(`added a new entry: ${blogs[index].title}`).waitFor()
      }
    })

    test('items are sorted by likes (top to bottom)', async ({ page }) => {
      for (let index = 0; index < blogs.length; index++) {
        const blogLocator = await page.locator('.blog')
          .filter({ has: page.getByText(blogs[index].title, { exact: true })})
        blogLocator.getByRole('button', { name: 'View' }).click()

        for (let j = 0; j < (index + 2); j++) {
          await blogLocator.getByRole('button', { name: 'like' }).click()
          await blogLocator.getByText(`Likes: ${j}`).waitFor()
        }
      }

      const firstBlog = await page.locator('.blog')
        .nth(0).locator('..').getByText('Likes: 3')
      expect(firstBlog).toBeVisible()

      const LastBlog = await page.locator('.blog')
        .last().locator('..').getByText('Likes: 1')
      expect(LastBlog).toBeVisible()
    })
  })
})