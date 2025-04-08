import { test, describe, expect, beforeEach } from "@playwright/test";
import "dotenv/config";
import { createNote, loginWith } from "./helper";

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`/api/testing/reset`)
    await request.post(`/api/users`, {
      data: {
        name: 'Testing User',
        username: process.env.TESTS_USERNAME,
        password: process.env.TESTS_USERPASS,
      }
    })
    
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, process.env.TESTS_USERNAME, process.env.TESTS_USERPASS)

    await expect(page.getByText('Testing User logged-in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, process.env.TESTS_USERNAME, process.env.TESTS_USERPASS)
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'A new note created using Playwright')

      await expect(page.getByText('A new note created using Playwright')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'Fist note')
        await createNote(page, 'Second note')
        await createNote(page, 'Third note')
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const otherNoteText = await page.getByText('Second note')
        const otherNoteElement = await otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, process.env.TESTS_USERNAME, 'wrongPa')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    
    await expect(page.getByText('Testing User logged-in')).not.toBeVisible()
  })
})