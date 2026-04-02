export class PokeAppPage {
    constructor(page) {
        this.page = page
        this.searchBar = page.getByPlaceholder('Search Pokemon')
        this.cardTitle = page.locator('.pokemon-card .name')
        this.detailsButton = page.getByRole('button', { name: 'View Details'})
        this.modal = page.locator('.pwa-modal-content')
    this.weight = page.locator('[data-testedid="pokemon-weight"]')
    }

    async searchAndOpenDetails(name) {
        await this.searchBar.fill(name)
        await this.page.keyboard.press('Enter')
        await this.cardTitle.waitFor({ state: 'Visible' })
        await this.detailsButton.click()
    }
}