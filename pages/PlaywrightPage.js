export class PlaywrightPage {
   constructor(page) {
    this.page = page
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.searchInput = page.getByPlaceholder('Search docs')
   }

   async visit() {
    await this.page.goto('/')
   }

   async searchFor(text) {
    await this.searchButton.click()
    await this.searchInput.fill(text)
    await this.page.keyboard.press('Enter')
   }
}
