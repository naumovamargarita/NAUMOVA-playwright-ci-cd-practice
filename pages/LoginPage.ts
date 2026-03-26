import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  // readonly errorMessage: Locator // можна додати для перевірки помилок

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('#login-button')
    // this.errorMessage = page.locator('#error-message')
  }

  // Навігація
  async goto() {
    await this.page.goto('https://www.saucedemo.com/')
  }

  // Атомарні дії
  async fillLoginForm(user: string, pass: string) {
    await this.usernameInput.fill(user)
    await this.passwordInput.fill(pass)
  }

  async submit() {
    await this.loginButton.click()
  }

  // Високорівневий метод (Flow)
  async login(user: string, pass: string) {
    await this.fillLoginForm(user, pass)
    await this.submit()
  }
}