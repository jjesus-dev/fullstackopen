const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('txtUsername').fill(username)
    await page.getByTestId('txtPassword').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'New note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'Save' }).click()
}

export { loginWith, createNote }