import { type Page, type Locator } from '@playwright/test'

export class MyFormPage {
  readonly page: Page
  readonly field1: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.field1 = page.locator('#field1')
    this.submitButton = page.locator('#submit')
  }

  async goto() { await this.page.goto('https://example.com/form') }
  async fillField1(value: string) { await this.field1.fill(value) }
  async submit() { await this.submitButton.click() }
  async submitForm(value: string) { await this.fillField1(value); await this.submit() }
}